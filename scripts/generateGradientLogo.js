import fs from 'fs';
import zlib from 'zlib';
import path from 'path';

// Load clean original binary extracted from initial commit
const origPath = 'C:/Users/bicky/.gemini/antigravity/brain/952e14b1-debf-4a31-b67b-0e3b2a4b8535/scratch/original_Logo_clean.png';
const origBuf = fs.readFileSync(origPath);

let pos = 8;
const idatChunks = [];
while (pos < origBuf.length) {
  const len = origBuf.readUInt32BE(pos);
  const type = origBuf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') idatChunks.push(origBuf.slice(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const compressed = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(compressed);
const origW = 2752, origH = 1536;
const origStride = 1 + origW * 4;
const origData = Buffer.alloc(origW * origH * 4);

for (let y = 0; y < origH; y++) {
  const filter = raw[y * origStride];
  for (let x = 0; x < origW; x++) {
    const rawIdx = y * origStride + 1 + x * 4;
    const outIdx = (y * origW + x) * 4;
    for (let c = 0; c < 4; c++) {
      let val = raw[rawIdx + c];
      const a = x > 0 ? origData[(y * origW + (x - 1)) * 4 + c] : 0;
      const b = y > 0 ? origData[((y - 1) * origW + x) * 4 + c] : 0;
      const cVal = (x > 0 && y > 0) ? origData[((y - 1) * origW + (x - 1)) * 4 + c] : 0;
      if (filter === 1) val = (val + a) & 0xff;
      else if (filter === 2) val = (val + b) & 0xff;
      else if (filter === 3) val = (val + Math.floor((a + b) / 2)) & 0xff;
      else if (filter === 4) {
        const p = a + b - cVal;
        const pa = Math.abs(p - a), pb = Math.abs(p - b), pc = Math.abs(p - cVal);
        let pr = a;
        if (pb < pa && pb < pc) pr = b;
        else if (pc < pa) pr = cVal;
        val = (val + pr) & 0xff;
      }
      origData[outIdx + c] = val;
    }
  }
}

// Icon & text bounding boxes in original
const iconOrig = { x0: 325, y0: 495, w: 719, h: 547 };
const textOrig = { x0: 1123, y0: 667, w: 1377, h: 203 };

function getAlpha(x, y) {
  if (x < 0 || x >= origW || y < 0 || y >= origH) return 0;
  const idx = (Math.floor(y) * origW + Math.floor(x)) * 4;
  const r = origData[idx], g = origData[idx+1], b = origData[idx+2];
  const lum = 0.299 * r + 0.587 * g + 0.114 * b;
  const diff = Math.max(r,g,b) - Math.min(r,g,b);
  if (lum > 228 && diff < 16) return 0;
  if (lum < 50) return 1.0;
  return Math.max(0, Math.min(1.0, (228 - lum) / 178));
}

function sampleAlpha(x, y) {
  const x0 = Math.floor(x), x1 = Math.min(origW - 1, x0 + 1);
  const y0 = Math.floor(y), y1 = Math.min(origH - 1, y0 + 1);
  const fx = x - x0, fy = y - y0;
  const a00 = getAlpha(x0, y0);
  const a10 = getAlpha(x1, y0);
  const a01 = getAlpha(x0, y1);
  const a11 = getAlpha(x1, y1);
  return (a00*(1-fx) + a10*fx)*(1-fy) + (a01*(1-fx) + a11*fx)*fy;
}

// Composition parameters for YouTube-style professional alignment
// Both elements share the exact vertical centerline
const canvasH = 400;
const centerY = canvasH / 2; // 200

// Scaled icon & text:
// Icon height: 340px, Text height: 280px (Icon : Text ratio is 1.21 : 1, perfectly balanced like YouTube)
const targetIconH = 340;
const targetIconW = Math.round(targetIconH * (iconOrig.w / iconOrig.h)); // 447
const targetTextH = 280;
const targetTextW = Math.round(targetTextH * (textOrig.w / textOrig.h)); // 1899
const gap = 55;
const padX = 25;

const iconX0 = padX;
const iconY0 = Math.round(centerY - targetIconH / 2);

const textX0 = iconX0 + targetIconW + gap;
const textY0 = Math.round(centerY - targetTextH / 2);

const canvasW = textX0 + targetTextW + padX;

// Output scanlines
const outRaw = Buffer.alloc(canvasH * (1 + canvasW * 4));

// Vibrant modern tech gradient: Sky Blue -> Electric Blue -> Indigo -> Violet -> Purple
const stops = [
  { p: 0.00, r: 0,   g: 150, b: 255 }, // #0096ff
  { p: 0.22, r: 37,  g: 99,  b: 235 }, // #2563eb
  { p: 0.48, r: 79,  g: 70,  b: 229 }, // #4f46e5
  { p: 0.74, r: 124, g: 58,  b: 237 }, // #7c3aed
  { p: 1.00, r: 175, g: 70,  b: 245 }, // #af46f5
];

function getGradientColor(t) {
  const p = Math.max(0, Math.min(1, t));
  for (let i = 0; i < stops.length - 1; i++) {
    const s0 = stops[i], s1 = stops[i+1];
    if (p >= s0.p && p <= s1.p) {
      const f = (p - s0.p) / (s1.p - s0.p);
      return [
        Math.round(s0.r + (s1.r - s0.r) * f),
        Math.round(s0.g + (s1.g - s0.g) * f),
        Math.round(s0.b + (s1.b - s0.b) * f)
      ];
    }
  }
  return [stops[stops.length-1].r, stops[stops.length-1].g, stops[stops.length-1].b];
}

for (let y = 0; y < canvasH; y++) {
  const rowStart = y * (1 + canvasW * 4);
  outRaw[rowStart] = 0; // Filter 0
  for (let x = 0; x < canvasW; x++) {
    const pxIdx = rowStart + 1 + x * 4;
    let alpha = 0;

    // Check if in icon region
    if (x >= iconX0 && x < iconX0 + targetIconW && y >= iconY0 && y < iconY0 + targetIconH) {
      const srcX = iconOrig.x0 + ((x - iconX0) / targetIconW) * iconOrig.w;
      const srcY = iconOrig.y0 + ((y - iconY0) / targetIconH) * iconOrig.h;
      alpha = Math.max(alpha, sampleAlpha(srcX, srcY));
    }

    // Check if in text region
    if (x >= textX0 && x < textX0 + targetTextW && y >= textY0 && y < textY0 + targetTextH) {
      const srcX = textOrig.x0 + ((x - textX0) / targetTextW) * textOrig.w;
      const srcY = textOrig.y0 + ((y - textY0) / targetTextH) * textOrig.h;
      alpha = Math.max(alpha, sampleAlpha(srcX, srcY));
    }

    if (alpha > 0) {
      const t = (x / canvasW) * 0.90 + (y / canvasH) * 0.10;
      const [r, g, b] = getGradientColor(t);
      outRaw[pxIdx] = r;
      outRaw[pxIdx + 1] = g;
      outRaw[pxIdx + 2] = b;
      outRaw[pxIdx + 3] = Math.round(alpha * 255);
    } else {
      outRaw[pxIdx] = 0;
      outRaw[pxIdx + 1] = 0;
      outRaw[pxIdx + 2] = 0;
      outRaw[pxIdx + 3] = 0;
    }
  }
}

// CRC32 helper & PNG encoding
const crcTable = [];
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  crcTable[n] = c;
}
function getCrc(buf) {
  let c = -1;
  for (let i = 0; i < buf.length; i++) c = (c >>> 8) ^ crcTable[(c ^ buf[i]) & 0xff];
  return (c ^ (-1)) >>> 0;
}
function makeChunk(type, dataBuf) {
  const len = dataBuf.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  dataBuf.copy(chunk, 8);
  const crc = getCrc(chunk.slice(4, 8 + len));
  chunk.writeUInt32BE(crc, 8 + len);
  return chunk;
}

const deflated = zlib.deflateSync(outRaw, { level: 9 });
const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(canvasW, 0);
ihdr.writeUInt32BE(canvasH, 4);
ihdr[8] = 8;
ihdr[9] = 6; // RGBA
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const pngBuf = Buffer.concat([
  sig,
  makeChunk('IHDR', ihdr),
  makeChunk('IDAT', deflated),
  makeChunk('IEND', Buffer.alloc(0))
]);

// Write output files across project
const targets = [
  'C:/Users/bicky/OneDrive/Desktop/Projects/AllToolHub/src/assets/logo.png',
  'C:/Users/bicky/OneDrive/Desktop/Projects/AllToolHub/public/Logo.png',
  'C:/Users/bicky/OneDrive/Desktop/Projects/AllToolHub/Logo.png',
];

targets.forEach(target => {
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, pngBuf);
  console.log('Saved gradient aligned logo to:', target, pngBuf.length, 'bytes');
});
