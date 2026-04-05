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

/** Keep GET URL under typical proxy limits (encoded q= grows fast with Unicode). */
const MAX_ENCODED_QUERY = 1600;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function encodedLength(s) {
  return encodeURIComponent(s).length;
}

/**
 * Split long string into segments whose encodeURIComponent length is <= maxEnc.
 * Greedy grow, then prefer break at newline or space inside the segment.
 * @param {string} s
 * @param {number} maxEnc
 * @returns {string[]}
 */
function splitByEncodedBudget(s, maxEnc) {
  if (encodedLength(s) <= maxEnc) return [s];
  const chunks = [];
  let i = 0;
  while (i < s.length) {
    let j = i;
    while (j < s.length && encodedLength(s.slice(i, j + 1)) <= maxEnc) {
      j++;
    }
    if (j === i) {
      chunks.push(s.slice(i, i + 1));
      i++;
      continue;
    }
    let slice = s.slice(i, j);
    const lastNl = slice.lastIndexOf('\n');
    const lastSp = slice.lastIndexOf(' ');
    const br = Math.max(lastNl, lastSp);
    if (br > 0 && br >= slice.length * 0.15) {
      const atNl = lastNl === br;
      slice = s.slice(i, i + br + (atNl ? 1 : 0));
      chunks.push(slice);
      i += slice.length;
    } else {
      chunks.push(slice);
      i = j;
    }
  }
  return chunks;
}

/** @param {string} text @param {string} tl et|lv */
/** Join all sentence/phrase segments from client=gtx JSON (first column only is [0][i][0]). */
function gtxJoinTranslatedSegments(data) {
  const row = data?.[0];
  if (!Array.isArray(row)) return '';
  let out = '';
  for (const seg of row) {
    if (Array.isArray(seg) && typeof seg[0] === 'string') out += seg[0];
  }
  return out;
}

async function gtxTranslate(text, tl) {
  const q = encodeURIComponent(text);
  const url = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=en&tl=${tl}&dt=t&q=${q}`;
  let lastErr;
  for (let a = 0; a < 5; a++) {
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error(String(res.status));
      const data = await res.json();
      const out = gtxJoinTranslatedSegments(data);
      if (out === '') throw new Error('bad gtx shape');
      await sleep(PAUSE_MS);
      return out;
    } catch (e) {
      lastErr = e;
      await sleep(PAUSE_MS * 3 * (a + 1));
    }
  }
  throw lastErr;
}

/**
 * Translate possibly long text by splitting paragraphs, lines, then encoded-size chunks.
 * @param {string} text
 * @param {string} tl
 */
async function gtxTranslateChunked(text, tl) {
  if (text === '') return '';
  if (encodedLength(text) <= MAX_ENCODED_QUERY) {
    return gtxTranslate(text, tl);
  }
  const re = /\n{2,}/;
  if (re.test(text)) {
    const bits = text.split(re);
    const sep = text.match(re)?.[0] || '\n\n';
    let acc = '';
    for (let i = 0; i < bits.length; i++) {
      acc += await gtxTranslateChunked(bits[i], tl);
      if (i < bits.length - 1) acc += sep;
    }
    return acc;
  }
  if (text.includes('\n')) {
    const lines = text.split('\n');
    const tr = [];
    for (let li = 0; li < lines.length; li++) {
      tr.push(await gtxTranslateChunked(lines[li], tl));
    }
    return tr.join('\n');
  }
  const hard = splitByEncodedBudget(text, MAX_ENCODED_QUERY);
  const sub = [];
  for (const h of hard) {
    sub.push(await gtxTranslate(h, tl));
  }
  return sub.join('');
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
        const once = await gtxTranslateChunked(p.text, tl);
        p.text = once;
        p.copyText = once;
      } else {
        p.text = await gtxTranslateChunked(p.text, tl);
        p.copyText = await gtxTranslateChunked(p.copyText, tl);
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
