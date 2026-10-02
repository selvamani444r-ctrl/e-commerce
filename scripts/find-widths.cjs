const fs = require('fs');
const path = require('path');

function searchDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    if (fs.statSync(full).isDirectory()) {
      searchDir(full);
    } else if (f.endsWith('.jsx') || f.endsWith('.css')) {
      const content = fs.readFileSync(full, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (/minWidth|min-width|width:\s*['"]?[4-9]\d\dpx|gridTemplateColumns|grid-template-columns/i.test(line)) {
          console.log(f + ':' + (idx+1) + ': ' + line.trim());
        }
      });
    }
  }
}
searchDir('src');
