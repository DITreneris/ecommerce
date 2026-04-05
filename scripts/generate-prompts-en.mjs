/**
 * Build assets/data/prompts.en.json from prompts.lt.json via Lingva GraphQL.
 * Run: node scripts/generate-prompts-en.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const ltPath = path.join(root, 'assets', 'data', 'prompts.lt.json');
const outPath = path.join(root, 'assets', 'data', 'prompts.en.json');

const GQL_URL = 'https://lingva.ml/api/graphql';

const CAT_EN = {
  start: 'Get started',
  sales: 'Sales',
  procurement: 'Procurement',
  logistics: 'Logistics',
  ecommerce: 'E-commerce',
  design: 'Design',
  analytics: 'Data analytics',
  marketing: 'Marketing',
  it: 'IT',
  finance: 'Finance',
  hr: 'HR',
  productivity: 'Productivity',
  advanced: 'Advanced',
};

const QUERY = `query T($q: String!) {
  translation(source: "lt", target: "en", query: $q) {
    target { text }
  }
}`;

const PAUSE_MS = 600;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function translateText(text, retries = 4) {
  let lastErr;
  for (let a = 0; a < retries; a++) {
    try {
      const res = await fetch(GQL_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: QUERY, variables: { q: text } }),
      });
      const data = await res.json();
      if (data.errors) throw new Error(JSON.stringify(data.errors));
      const out = data?.data?.translation?.target?.text;
      if (typeof out !== 'string') throw new Error(JSON.stringify(data));
      await sleep(PAUSE_MS);
      return out;
    } catch (e) {
      lastErr = e;
      await sleep(PAUSE_MS * 2 * (a + 1));
    }
  }
  throw lastErr;
}

async function main() {
  const lt = JSON.parse(fs.readFileSync(ltPath, 'utf8'));
  const en = structuredClone(lt);

  for (const cat of en.categories) {
    cat.name = CAT_EN[cat.id] || cat.name;
    for (const p of cat.prompts) {
      p.title = await translateText(p.title);
      if (p.text === p.copyText) {
        const once = await translateText(p.text);
        p.text = once;
        p.copyText = once;
      } else {
        p.text = await translateText(p.text);
        p.copyText = await translateText(p.copyText);
      }
      if (Array.isArray(p.keywords)) {
        const kw = [];
        for (const k of p.keywords) {
          kw.push(await translateText(k));
        }
        p.keywords = kw;
      }
      console.error(`OK ${cat.id} #${p.id}`);
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(en, null, 2), 'utf8');
  console.error('Wrote', outPath);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
