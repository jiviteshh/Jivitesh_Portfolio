import fs from 'fs/promises';
import fsSync from 'fs';
import path from 'path';

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

async function walk(dir, files = []) {
  const entries = await fs.readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      await walk(full, files);
    } else {
      files.push(full);
    }
  }
  return files;
}

async function fileExists(filePath) {
  try {
    await fs.access(filePath);
    return true;
  } catch (e) {
    return false;
  }
}

function resolveCandidates(root, htmlFile, resource) {
  const candidates = [];
  if (!resource) return candidates;
  if (resource.startsWith('/')) {
    const rel = resource.replace(/^\//, '');
    candidates.push(path.join(root, rel));
    candidates.push(path.join(root, 'public', rel));
  } else {
    candidates.push(path.resolve(path.dirname(htmlFile), resource));
    candidates.push(path.join(root, resource));
    candidates.push(path.join(root, 'public', resource));
  }
  return candidates;
}

async function ensureSuggestedExists(root, htmlFile, suggested) {
  const candidates = resolveCandidates(root, htmlFile, suggested);
  for (const c of candidates) {
    if (await fileExists(c) && fsSync.statSync(c).isFile()) return true;
  }
  return false;
}

async function originalExists(root, htmlFile, original) {
  const candidates = resolveCandidates(root, htmlFile, original);
  for (const c of candidates) {
    if (await fileExists(c) && fsSync.statSync(c).isFile()) return true;
  }
  return false;
}

async function main() {
  try {
    const argv = process.argv.slice(2);
    if (argv.length < 1) {
      console.error('Usage: node scripts/apply-suggestions.mjs <suggestions.json> [projectRoot]');
      process.exit(2);
    }

    const suggestionsPath = path.resolve(argv[0]);
    const root = argv[1] ? path.resolve(argv[1]) : process.cwd();

    const mappingRaw = await fs.readFile(suggestionsPath, 'utf8');
    const mapping = JSON.parse(mappingRaw);

    const allFiles = await walk(root);
    const htmlFiles = allFiles.filter((f) => f.toLowerCase().endsWith('.html'));

    const summary = { updated: [], skipped: [], errors: [] };

    for (const htmlPath of htmlFiles) {
      const rel = path.relative(root, htmlPath).replace(/\\/g, '/');
      const suggestionsForHtml = mapping[rel] || mapping['./' + rel] || mapping['/' + rel];
      if (!suggestionsForHtml) continue;

      let content = await fs.readFile(htmlPath, 'utf8');
      let originalContent = content;
      let modified = false;

      for (const [originalRef, suggestedRef] of Object.entries(suggestionsForHtml)) {
        try {
          const origExists = await originalExists(root, htmlPath, originalRef);
          if (origExists) {
            summary.skipped.push({ file: rel, ref: originalRef, reason: 'original exists' });
            continue;
          }

          const suggestedExists = await ensureSuggestedExists(root, htmlPath, suggestedRef);
          if (!suggestedExists) {
            summary.skipped.push({ file: rel, ref: originalRef, suggestion: suggestedRef, reason: 'suggested missing' });
            continue;
          }

          const esc = escapeRegExp(originalRef);
          const attrRegex = new RegExp(`(src|href)=(\\\"|\\\')${esc}\\2`, 'g');
          const replacement = `$1=$2${suggestedRef}$2`;
          const newContent = content.replace(attrRegex, replacement);
          if (newContent !== content) {
            content = newContent;
            modified = true;
            summary.updated.push({ file: rel, from: originalRef, to: suggestedRef });
          } else {
            const looseRegex = new RegExp(`([\\\"'])${esc}([\\\"'])`, 'g');
            const looseReplacement = `$1${suggestedRef}$2`;
            const afterLoose = content.replace(looseRegex, looseReplacement);
            if (afterLoose !== content) {
              content = afterLoose;
              modified = true;
              summary.updated.push({ file: rel, from: originalRef, to: suggestedRef, note: 'loose replacement' });
            } else {
              summary.skipped.push({ file: rel, ref: originalRef, suggestion: suggestedRef, reason: 'no match to replace' });
            }
          }
        } catch (err) {
          summary.errors.push({ file: rel, ref: originalRef, error: String(err) });
        }
      }

      if (modified && content !== originalContent) {
        await fs.writeFile(htmlPath, content, 'utf8');
      }
    }

    console.log('Apply-suggestions completed. Summary:');
    console.log(`- files updated: ${summary.updated.length}`);
    for (const u of summary.updated) console.log(`  - ${u.file}: ${u.from} -> ${u.to}${u.note ? ' (' + u.note + ')' : ''}`);
    console.log(`- skipped: ${summary.skipped.length}`);
    for (const s of summary.skipped) console.log(`  - ${s.file}: ${s.ref}  reason: ${s.reason}${s.suggestion ? ' suggestion: ' + s.suggestion : ''}`);
    if (summary.errors.length) {
      console.log(`- errors: ${summary.errors.length}`);
      for (const e of summary.errors) console.log(`  - ${e.file}: ${e.ref} error: ${e.error}`);
    }

  } catch (e) {
    console.error('Fatal error:', e);
    process.exit(1);
  }
}

if (import.meta.url === `file://${process.argv[1]}` || import.meta.url.endsWith(process.argv[1])) {
  main();
}
