import fs from 'fs';
import path from 'path';

const candidatePaths = ['dist/index.dev.html', 'dist/index.html'];
const htmlPath = candidatePaths.find(p => fs.existsSync(p));
if (!htmlPath) {
  console.error('Built HTML not found in dist/! Run npm run build first.');
  process.exit(1);
}

let content = fs.readFileSync(htmlPath, 'utf8');

// Ensure directories exist
fs.mkdirSync('docs', { recursive: true });
fs.mkdirSync('dist', { recursive: true });

// Copy public assets (SVGs, icons) to root, dist, and docs
const publicDir = 'public';
if (fs.existsSync(publicDir)) {
  for (const file of fs.readdirSync(publicDir)) {
    const src = path.join(publicDir, file);
    fs.copyFileSync(src, path.join('.', file));
    fs.copyFileSync(src, path.join('dist', file));
    fs.copyFileSync(src, path.join('docs', file));
  }
}

// Create .nojekyll to prevent GitHub Pages from ignoring files
fs.writeFileSync('.nojekyll', '', 'utf8');
fs.writeFileSync('dist/.nojekyll', '', 'utf8');
fs.writeFileSync('docs/.nojekyll', '', 'utf8');

// Remove modulepreload tags
content = content.replace(/<link\s+rel="modulepreload"[^>]*>/gi, '');

// Locate the bundle script accurately
const startTag = '<script type="module" crossorigin>';
const startIndex = content.indexOf(startTag);
if (startIndex === -1) {
  console.error('Could not find startTag in ' + htmlPath);
  process.exit(1);
}

const scriptEnd = content.indexOf('</script>', startIndex);
if (scriptEnd === -1 || scriptEnd <= startIndex) {
  console.error('Could not find end of script in ' + htmlPath);
  process.exit(1);
}

const beforeScript = content.slice(0, startIndex);
const scriptCode = content.slice(startIndex + startTag.length, scriptEnd);
const afterScript = content.slice(scriptEnd + '</script>'.length);

// Reassemble HTML: remove script from <head> and place in <body> AFTER <div id="root"></div>
let reassembled = beforeScript + afterScript;
const rootMount = '<div id="root"></div>';
const rootIdx = reassembled.indexOf(rootMount);
if (rootIdx === -1) {
  console.error('Could not find <div id="root"></div> in html');
  process.exit(1);
}

// USE SLICE, NOT .replace(), TO PREVENT $ CORRUPTION IN MINIFIED JS CODE
reassembled = 
  reassembled.slice(0, rootIdx + rootMount.length) +
  '\n    <script>\n' +
  scriptCode +
  '\n    </script>' +
  reassembled.slice(rootIdx + rootMount.length);

// Ensure relative paths for all assets so GitHub Pages subpaths work flawlessly
reassembled = reassembled.replaceAll('href="/logo-icon.svg"', 'href="./logo-icon.svg"');
reassembled = reassembled.replaceAll('href="/favicon.svg"', 'href="./favicon.svg"');
reassembled = reassembled.replaceAll('src="/logo-icon.svg"', 'src="./logo-icon.svg"');
reassembled = reassembled.replaceAll('href="/logo.svg"', 'href="./logo.svg"');
reassembled = reassembled.replaceAll('href="/icons.svg"', 'href="./icons.svg"');

// 1. Write standalone offline file
fs.writeFileSync('Nexus-Nook.html', reassembled, 'utf8');

// 2. Write root index.html (serves GitHub Pages "Deploy from branch: main / root")
fs.writeFileSync('index.html', reassembled, 'utf8');

// 3. Write 404.html (fallback for GitHub Pages routes)
fs.writeFileSync('404.html', reassembled, 'utf8');

// 4. Write dist/index.html (for GitHub Actions pages deployment)
fs.writeFileSync('dist/index.html', reassembled, 'utf8');

// 5. Write docs/index.html (serves GitHub Pages "Deploy from branch: main / docs")
fs.writeFileSync('docs/index.html', reassembled, 'utf8');

console.log('SUCCESS: Generated production bundles for GitHub Pages and offline viewing! Size: ' + reassembled.length + ' bytes');

