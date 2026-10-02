import fs from 'fs';
import path from 'path';

const htmlPath = 'dist/index.html';
if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

let content = fs.readFileSync(htmlPath, 'utf8');

// Copy public assets (SVGs, icons) to root for local file:// protocol access
const publicDir = 'public';
if (fs.existsSync(publicDir)) {
  for (const file of fs.readdirSync(publicDir)) {
    fs.copyFileSync(path.join(publicDir, file), path.join('.', file));
  }
}

// Remove modulepreload tags
content = content.replace(/<link\s+rel="modulepreload"[^>]*>/gi, '');

// Locate the bundle script accurately
const startTag = '<script type="module" crossorigin>';
const startIndex = content.indexOf(startTag);
if (startIndex === -1) {
  console.error('Could not find startTag in dist/index.html');
  process.exit(1);
}

const scriptEnd = content.indexOf('</script>', startIndex);
if (scriptEnd === -1 || scriptEnd <= startIndex) {
  console.error('Could not find end of script in dist/index.html');
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

// Ensure relative paths for all assets
reassembled = reassembled.replaceAll('href="/logo-icon.svg"', 'href="./logo-icon.svg"');
reassembled = reassembled.replaceAll('href="/favicon.svg"', 'href="./favicon.svg"');
reassembled = reassembled.replaceAll('src="/logo-icon.svg"', 'src="./logo-icon.svg"');
reassembled = reassembled.replaceAll('href="/logo.svg"', 'href="./logo.svg"');

// Write to Nexus-Nook.html
fs.writeFileSync('Nexus-Nook.html', reassembled, 'utf8');
console.log('SUCCESS: Generated 100% standalone offline Nexus-Nook.html! Total size: ' + reassembled.length + ' bytes');
