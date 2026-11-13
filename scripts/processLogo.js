import fs from 'fs';
import zlib from 'zlib';

const inputPath = 'c:/Users/bicky/OneDrive/Desktop/Projects/AllToolHub/Logo.png';
const outScratch = 'C:\\Users\\bicky\\.gemini\\antigravity\\brain\\952e14b1-debf-4a31-b67b-0e3b2a4b8535\\scratch\\Logo_transparent.png';

const buf = fs.readFileSync(inputPath);

let pos = 8;
const idatChunks = [];
while (pos < buf.length) {
  const len = buf.readUInt32BE(pos);
  const type = buf.toString('ascii', pos + 4, pos + 8);
  if (type === 'IDAT') idatChunks.push(buf.slice(pos + 8, pos + 8 + len));
  pos += 12 + len;
}
const compressed = Buffer.concat(idatChunks);
const raw = zlib.inflateSync(compressed);

const width = 2752;
const height = 1536;
const stride = 1 + width * 4;

const data = Buffer.alloc(width * height * 4);
for (let y = 0; y < height; y++) {
  const filter = raw[y * stride];
  for (let x = 0; x < width; x++) {
    const rawIdx = y * stride + 1 + x * 4;
    const outIdx = (y * width + x) * 4;
    for (let c = 0; c < 4; c++) {
      let val = raw[rawIdx + c];
      const a = x > 0 ? data[(y * width + (x - 1)) * 4 + c] : 0;
      const b = y > 0 ? data[((y - 1) * width + x) * 4 + c] : 0;
      const cVal = (x > 0 && y > 0) ? data[((y - 1) * width + (x - 1)) * 4 + c] : 0;
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
      data[outIdx + c] = val;
    }
  }
}

// Logo bounds identified
const minX = 315;
const maxX = 2510;
const minY = 485;
const maxY = 1050;

const cropW = maxX - minX + 1;
const cropH = maxY - minY + 1;
console.log('Cropping to:', { cropW, cropH, minX, maxX, minY, maxY });

// Build cropped scanlines with alpha transparency on background
const cropStride = 1 + cropW * 4;
const cropRaw = Buffer.alloc(cropH * cropStride);

for (let y = 0; y < cropH; y++) {
  const origY = minY + y;
  const targetRow = y * cropStride;
  cropRaw[targetRow] = 0; // Filter 0 (None)
  
  for (let x = 0; x < cropW; x++) {
    const origX = minX + x;
    const srcIdx = (origY * width + origX) * 4;
    const dstIdx = targetRow + 1 + x * 4;

    const r = data[srcIdx];
    const g = data[srcIdx+1];
    const b = data[srcIdx+2];

    const maxC = Math.max(r, g, b);
    const minC = Math.min(r, g, b);
    const diff = maxC - minC;
    const brightness = (r * 0.299 + g * 0.587 + b * 0.114);

    let a = 255;
    if (brightness > 218 && diff < 16) {
      // Pure background
      a = 0;
    } else if (brightness > 190 && diff < 20) {
      // Smooth edge antialiasing
      const factor = (brightness - 190) / 28;
      a = Math.max(0, Math.min(255, Math.round(255 * (1 - factor))));
    } else {
      a = 255;
    }

    cropRaw[dstIdx] = r;
    cropRaw[dstIdx+1] = g;
    cropRaw[dstIdx+2] = b;
    cropRaw[dstIdx+3] = a;
  }
}

const deflated = zlib.deflateSync(cropRaw, { level: 9 });

// CRC32 helper
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

const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

const ihdr = Buffer.alloc(13);
ihdr.writeUInt32BE(cropW, 0);
ihdr.writeUInt32BE(cropH, 4);
ihdr[8] = 8;
ihdr[9] = 6; // RGBA
ihdr[10] = 0;
ihdr[11] = 0;
ihdr[12] = 0;

const ihdrChunk = makeChunk('IHDR', ihdr);
const idatChunk = makeChunk('IDAT', deflated);
const iendChunk = makeChunk('IEND', Buffer.alloc(0));

const finalPng = Buffer.concat([sig, ihdrChunk, idatChunk, iendChunk]);
fs.writeFileSync(outScratch, finalPng);
console.log('Successfully saved transparent cropped logo:', outScratch, finalPng.length, 'bytes');
