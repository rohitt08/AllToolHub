import fs from 'fs';
import path from 'path';

// Read tools from scratch or import
const scratchPath = 'C:\\Users\\bicky\\.gemini\\antigravity\\brain\\952e14b1-debf-4a31-b67b-0e3b2a4b8535\\scratch\\tools.ts';
const content = fs.readFileSync(scratchPath, 'utf-8');

// Extract all ids
const matches = [...content.matchAll(/"id":\s*"([^"]+)"/g)].map(m => m[1]);

let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://alltoolhub.com/</loc>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
`;

for (const id of matches) {
  xml += `  <url>
    <loc>https://alltoolhub.com/?tool=${id}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
`;
}

xml += `</urlset>`;

fs.writeFileSync('C:\\Users\\bicky\\.gemini\\antigravity\\brain\\952e14b1-debf-4a31-b67b-0e3b2a4b8535\\scratch\\sitemap.xml', xml, 'utf-8');
console.log(`Generated sitemap with ${matches.length} tool URLs`);

