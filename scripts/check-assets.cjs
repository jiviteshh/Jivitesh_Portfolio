#!/usr/bin/env node
const fs = require('fs');
const path = require('path');

function walkSync(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name === 'node_modules' || entry.name === '.git') continue;
      walkSync(full, fileList);
    } else {
      fileList.push(full);
    }
  }
  return fileList;
}

function extractAssets(html) {
  const results = [];
  const patterns = [
    { tag: 'img', attr: 'src' },
    { tag: 'script', attr: 'src' },
    { tag: 'link', attr: 'href' },
  ];
  for (const p of patterns) {
    const re = new RegExp(`<${p.tag}[^>]*?${p.attr}\\s*=\\s*(["'])(.*?)\\1`, 'gi');
    let m;
    while ((m = re.exec(html)) !== null) {
      results.push({ tag: p.tag, attr: p.attr, value: m[2] });
    }
  }
  return results;
}

function isRemote(href) {
  return /^(?:[a-z]+:)?\/\//i.test(href) || /^data:/i.test(href);
}

function resolveCandidates(root, htmlFile, resource) {
  const candidates = [];
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

function findFilesByBasename(root, basename, maxResults = 10) {
  const matches = [];
  const all = walkSync(root);
  for (const f of all) {
    if (path.basename(f).toLowerCase() === basename.toLowerCase()) {
      matches.push(f);
      if (matches.length >= maxResults) break;
    }
  }
  return matches;
}

function relativeSuggestion(from, to) {
  try {
    return path.relative(path.dirname(from), to) || path.basename(to);
  } catch (e) {
    return to;
  }
}

function main() {
  const root = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
  console.log(`Scanning HTML files in: ${root}`);
  const allFiles = walkSync(root);
  const htmlFiles = allFiles.filter((f) => f.toLowerCase().endsWith('.html'));
  if (!htmlFiles.length) {
    console.log('No .html files found. Exiting.');
    process.exit(0);
  }

  const missing = [];

  for (const htmlPath of htmlFiles) {
    const html = fs.readFileSync(htmlPath, 'utf8');
    const assets = extractAssets(html);
    for (const a of assets) {
      const val = a.value.trim();
      if (!val || isRemote(val)) continue;
      const candidates = resolveCandidates(root, htmlPath, val);
      let found = false;
      const tried = [];
      for (const c of candidates) {
        tried.push(c);
        if (fs.existsSync(c) && fs.statSync(c).isFile()) {
          found = true;
          break;
        }
      }
      if (!found) {
        const basename = path.basename(val);
        const suggestions = findFilesByBasename(root, basename, 5).map((s) => ({
          path: s,
          suggestedRelative: relativeSuggestion(htmlPath, s),
        }));
        missing.push({ html: htmlPath, tag: a.tag, attr: a.attr, ref: val, tried, suggestions });
      }
    }
  }

  if (!missing.length) {
    console.log('No missing assets found. Good job!');
    return;
  }

  console.log(`\nMissing assets (${missing.length}):\n`);
  for (const m of missing) {
    console.log(`- In: ${m.html}`);
    console.log(`  Tag: <${m.tag}> attribute: ${m.attr}`);
    console.log(`  Referenced: ${m.ref}`);
    console.log('  Tried paths:');
    for (const t of m.tried) console.log(`    - ${t}`);
    if (m.suggestions.length) {
      console.log('  Suggestions:');
      for (const s of m.suggestions) console.log(`    - ${s.path}  (relative to HTML: ${s.suggestedRelative})`);
    } else {
      console.log('  Suggestions: none found');
    }
    console.log('');
  }
}

if (require.main === module) main();
