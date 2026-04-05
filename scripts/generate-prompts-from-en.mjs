/**
 * Build assets/data/prompts.{et|lv}.json from prompts.en.json.
 * Uses Google Translate web client endpoint (client=gtx); rate-limited pauses between calls.
 * Run: node scripts/generate-prompts-from-en.mjs --target et
 *       node scripts/generate-prompts-from-en.mjs --target lv
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const enPath = path.join(root, 'assets', 'data', 'prompts.en.json');

const CAT_ET = {
  start: 'Alustamine',
  sales: 'Müük',
  procurement: 'Hanked',
  logistics: 'Logistika',
  ecommerce: 'E-kaubandus',
  design: 'Disain',
  analytics: 'Andmeanalüüs',
  marketing: 'Turundus',
  it: 'IT',
  finance: 'Rahandus',
  hr: 'HR',
  productivity: 'Tootlikkus',
  advanced: 'Täpsemad mallid',
};

const CAT_LV = {
  start: 'Sākšana',
  sales: 'Pārdošana',
  procurement: 'Iepirkumi',
  logistics: 'Loģistika',
  ecommerce: 'E-komercija',
  design: 'Dizains',
  analytics: 'Datu analītika',
  marketing: 'Mārketings',
  it: 'IT',
  finance: 'Finanses',
  hr: 'HR',
  productivity: 'Produktivitāte',
  advanced: 'Padziļināti',
};

const TARGETS = {
  et: { file: 'prompts.et.json', catMap: CAT_ET, tl: 'et' },
  lv: { file: 'prompts.lv.json', catMap: CAT_LV, tl: 'lv' },
};

const PAUSE_MS = 250;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

/** @param {string} text @param {string} tl et|lv */
async function gtxTranslate(text, tl) {
  const q = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${q}`;
  let lastErr;
  for (let a = 0; a < 5; a++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const out = data?.[0]?.[0]?.[0];
      if (typeof out !== 'string') throw new Error('bad gtx shape');
      await sleep(PAUSE_MS);
      return out;
    } catch (e) {
      lastErr = e;
      await sleep(PAUSE_MS * 3 * (a + 1));
    }
  }
  throw lastErr;
}

async function main() {
  const arg = process.argv.find(x => x.startsWith('--target='));
  const targetKey = arg ? arg.split('=')[1] : process.argv[process.argv.indexOf('--target') + 1];
  if (!targetKey || !TARGETS[targetKey]) {
    console.error('Usage: node scripts/generate-prompts-from-en.mjs --target et|lv');
    process.exit(1);
  }
  const { file, catMap, tl } = TARGETS[targetKey];
  const outPath = path.join(root, 'assets', 'data', file);

  const en = JSON.parse(fs.readFileSync(enPath, 'utf8'));
  const out = structuredClone(en);

  for (const cat of out.categories) {
    cat.name = catMap[cat.id] || cat.name;
    for (const p of cat.prompts) {
      p.title = await gtxTranslate(p.title, tl);
      if (p.text === p.copyText) {
        const once = await gtxTranslate(p.text, tl);
        p.text = once;
        p.copyText = once;
      } else {
        p.text = await gtxTranslate(p.text, tl);
        p.copyText = await gtxTranslate(p.copyText, tl);
      }
      if (Array.isArray(p.keywords)) {
        const kw = [];
        for (const k of p.keywords) {
          kw.push(await gtxTranslate(k, tl));
        }
        p.keywords = kw;
      }
      console.error(`OK ${targetKey} ${cat.id} #${p.id}`);
    }
  }

  fs.writeFileSync(outPath, JSON.stringify(out, null, 2), 'utf8');
  console.error('Wrote', outPath);
}

main().catch(e => {
  console.error(e);
  process.exit(1);
});
