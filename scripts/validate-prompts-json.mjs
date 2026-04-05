/**
 * Parse and validate all assets/data/prompts.*.json files; exit 1 on failure.
 * Checks: JSON syntax, schema, totalPrompts vs sum, cross-locale category/prompt parity.
 * Run: node scripts/validate-prompts-json.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.join(__dirname, '..', 'assets', 'data');

const files = fs
  .readdirSync(dataDir)
  .filter(f => /^prompts\.[a-z]+\.json$/.test(f))
  .sort();

if (files.length === 0) {
  console.error('No prompts.*.json files found in', dataDir);
  process.exit(1);
}

/**
 * @param {unknown} data
 * @param {string} filename
 * @returns {{ structure: { id: string, promptIds: (number|string)[] }[] }}
 */
function validateFile(data, filename) {
  if (typeof data !== 'object' || data === null || Array.isArray(data)) {
    throw new Error(`${filename}: root must be a JSON object`);
  }
  const root = /** @type {Record<string, unknown>} */ (data);

  if (typeof root.totalPrompts !== 'number' || !Number.isFinite(root.totalPrompts)) {
    throw new Error(`${filename}: totalPrompts must be a finite number`);
  }
  if (!Number.isInteger(root.totalPrompts) || root.totalPrompts < 0) {
    throw new Error(`${filename}: totalPrompts must be a non-negative integer`);
  }

  const categories = root.categories;
  if (!Array.isArray(categories) || categories.length === 0) {
    throw new Error(`${filename}: categories must be a non-empty array`);
  }

  let sum = 0;
  /** @type {{ id: string, promptIds: (number|string)[] }[]} */
  const structure = [];

  for (let ci = 0; ci < categories.length; ci++) {
    const cat = categories[ci];
    if (typeof cat !== 'object' || cat === null || Array.isArray(cat)) {
      throw new Error(`${filename}: categories[${ci}] must be an object`);
    }
    const c = /** @type {Record<string, unknown>} */ (cat);

    if (typeof c.id !== 'string' || c.id.trim() === '') {
      throw new Error(`${filename}: categories[${ci}].id must be a non-empty string`);
    }
    if (typeof c.name !== 'string') {
      throw new Error(`${filename}: categories[${ci}].name must be a string`);
    }

    const prompts = c.prompts;
    if (!Array.isArray(prompts)) {
      throw new Error(`${filename}: categories[${ci}].prompts must be an array`);
    }

    /** @type {(number|string)[]} */
    const promptIds = [];

    for (let pi = 0; pi < prompts.length; pi++) {
      const pr = prompts[pi];
      if (typeof pr !== 'object' || pr === null || Array.isArray(pr)) {
        throw new Error(`${filename}: categories[${ci}].prompts[${pi}] must be an object`);
      }
      const p = /** @type {Record<string, unknown>} */ (pr);

      if (typeof p.title !== 'string') {
        throw new Error(`${filename}: categories[${ci}].prompts[${pi}].title must be a string`);
      }
      if (typeof p.text !== 'string') {
        throw new Error(`${filename}: categories[${ci}].prompts[${pi}].text must be a string`);
      }
      if (p.copyText !== undefined && typeof p.copyText !== 'string') {
        throw new Error(
          `${filename}: categories[${ci}].prompts[${pi}].copyText must be a string when present`
        );
      }
      if (p.keywords !== undefined) {
        if (!Array.isArray(p.keywords)) {
          throw new Error(
            `${filename}: categories[${ci}].prompts[${pi}].keywords must be an array when present`
          );
        }
        for (let ki = 0; ki < p.keywords.length; ki++) {
          if (typeof p.keywords[ki] !== 'string') {
            throw new Error(
              `${filename}: categories[${ci}].prompts[${pi}].keywords[${ki}] must be a string`
            );
          }
        }
      }
      if (p.category !== undefined && typeof p.category !== 'string') {
        throw new Error(
          `${filename}: categories[${ci}].prompts[${pi}].category must be a string when present`
        );
      }

      if (p.id === undefined) {
        throw new Error(
          `${filename}: categories[${ci}].prompts[${pi}].id is required for cross-locale parity`
        );
      }
      const pid = p.id;
      if (typeof pid !== 'number' && typeof pid !== 'string') {
        throw new Error(
          `${filename}: categories[${ci}].prompts[${pi}].id must be a number or string`
        );
      }
      if (typeof pid === 'number' && !Number.isInteger(pid)) {
        throw new Error(
          `${filename}: categories[${ci}].prompts[${pi}].id must be an integer when numeric`
        );
      }
      promptIds.push(pid);
    }

    sum += prompts.length;
    structure.push({ id: c.id, promptIds });
  }

  if (sum !== root.totalPrompts) {
    throw new Error(
      `${filename}: totalPrompts is ${root.totalPrompts} but sum of prompts per category is ${sum}`
    );
  }

  const categoryIds = structure.map(s => s.id);
  const unique = new Set(categoryIds);
  if (unique.size !== categoryIds.length) {
    throw new Error(`${filename}: duplicate category id in categories array`);
  }

  return { structure };
}

/**
 * Canonical signature: sorted category ids, each mapped to prompt id list (order preserved within category).
 * @param {{ id: string, promptIds: (number|string)[] }[]} structure
 */
function paritySignature(structure) {
  const sorted = [...structure].sort((a, b) => (a.id < b.id ? -1 : a.id > b.id ? 1 : 0));
  return JSON.stringify(sorted.map(s => ({ id: s.id, promptIds: s.promptIds })));
}

/** @type {Map<string, ReturnType<typeof validateFile>>} */
const byFile = new Map();

for (const f of files) {
  const full = path.join(dataDir, f);
  let data;
  try {
    data = JSON.parse(fs.readFileSync(full, 'utf8'));
  } catch (e) {
    console.error('Invalid JSON:', full, e instanceof Error ? e.message : e);
    process.exit(1);
  }
  try {
    const result = validateFile(data, f);
    byFile.set(f, result);
    console.error('OK', f);
  } catch (e) {
    console.error(e instanceof Error ? e.message : e);
    process.exit(1);
  }
}

if (files.length > 1) {
  const first = files[0];
  const ref = byFile.get(first);
  if (!ref) process.exit(1);

  const refSig = paritySignature(ref.structure);

  for (let i = 1; i < files.length; i++) {
    const f = files[i];
    const cur = byFile.get(f);
    if (!cur) process.exit(1);

    if (paritySignature(cur.structure) !== refSig) {
      console.error(
        `Cross-locale mismatch: category ids or prompt counts / id sequences differ between ${first} and ${f}.`
      );
      process.exit(1);
    }
  }
}
