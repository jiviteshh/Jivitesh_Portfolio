import fs from "fs";
import path from "path";

// Root folder to scan
const ROOT_DIR = path.resolve(".");

function findFileAnywhere(filename, dir = ROOT_DIR) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && entry.name === filename) return fullPath;
    if (entry.isDirectory()) {
      const found = findFileAnywhere(filename, fullPath);
      if (found) return found;
    }
  }
  return null;
}

function fixHtmlFile(htmlPath) {
  let content = fs.readFileSync(htmlPath, "utf8");
  let updated = false;

  const regex = /(src|href)="([^"]+)"/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    const [fullMatch, attr, url] = match;
    if (url.startsWith("http") || url.startsWith("data:")) continue;

    const filename = path.basename(url);
    const currentPath = path.resolve(path.dirname(htmlPath), url);

    if (!fs.existsSync(currentPath)) {
      const foundPath = findFileAnywhere(filename);
      if (foundPath) {
        const relativePath = path.relative(path.dirname(htmlPath), foundPath).replace(/\\/g, "/");
        content = content.replace(url, relativePath);
        console.log(`Updated ${htmlPath}: ${url} → ${relativePath}`);
        updated = true;
      } else {
        console.log(`Missing: ${htmlPath} references ${url}`);
      }
    }
  }

  if (updated) {
    fs.writeFileSync(htmlPath, content, "utf8");
  }
}

// Scan all HTML files recursively
function scanDir(dir = ROOT_DIR) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isFile() && fullPath.endsWith(".html")) {
      fixHtmlFile(fullPath);
    } else if (entry.isDirectory()) {
      scanDir(fullPath);
    }
  }
}

scanDir();
console.log("Done!");
