const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

// CRC32 table for PNG chunk checksums
const crcTable = new Uint32Array(256);
for (let i = 0; i < 256; i++) {
  let c = i;
  for (let k = 0; k < 8; k++) {
    c = (c & 1) ? (0xedb88320 ^ (c >>> 1)) : (c >>> 1);
  }
  crcTable[i] = c;
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    crc = crcTable[(crc ^ buf[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function createChunk(type, data) {
  const len = data.length;
  const chunk = Buffer.alloc(12 + len);
  chunk.writeUInt32BE(len, 0);
  chunk.write(type, 4, 4, 'ascii');
  data.copy(chunk, 8);
  const typeAndData = chunk.subarray(4, 8 + len);
  chunk.writeUInt32BE(crc32(typeAndData), 8 + len);
  return chunk;
}

function generateRingPNG(size) {
  const width = size;
  const height = size;
  const rawData = Buffer.alloc((width * 4 + 1) * height);

  const center = size / 2;
  const outerR = size * 0.44;
  const innerR = size * 0.32;
  const glowR = size * 0.48;

  for (let y = 0; y < height; y++) {
    const rowOffset = y * (width * 4 + 1);
    rawData[rowOffset] = 0; // Filter type 0 (None)

    for (let x = 0; x < width; x++) {
      const pxOffset = rowOffset + 1 + x * 4;
      const dx = x - center + 0.5;
      const dy = y - center + 0.5;
      const dist = Math.sqrt(dx * dx + dy * dy);

      let alpha = 0;
      let r = 255, g = 178, b = 102; // Warm amber

      if (dist >= innerR && dist <= outerR) {
        // Sharp core ring with slight antialiasing
        const edgeDist = Math.min(dist - innerR, outerR - dist);
        alpha = Math.min(1.0, edgeDist * 1.5 + 0.3) * 255;
      } else if (dist > outerR && dist <= glowR) {
        // Outer glow falloff
        const t = 1.0 - (dist - outerR) / (glowR - outerR);
        alpha = t * t * 140;
      } else if (dist < innerR && dist >= innerR - (outerR - innerR) * 0.4) {
        // Inner soft glow
        const t = (dist - (innerR - (outerR - innerR) * 0.4)) / ((outerR - innerR) * 0.4);
        alpha = t * 100;
      }

      alpha = Math.max(0, Math.min(255, Math.round(alpha)));

      rawData[pxOffset] = r;
      rawData[pxOffset + 1] = g;
      rawData[pxOffset + 2] = b;
      rawData[pxOffset + 3] = alpha;
    }
  }

  // PNG Header
  const signature = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  // IHDR chunk
  const ihdrData = Buffer.alloc(13);
  ihdrData.writeUInt32BE(width, 0);
  ihdrData.writeUInt32BE(height, 4);
  ihdrData[8] = 8; // 8 bits per channel
  ihdrData[9] = 6; // RGBA color type
  ihdrData[10] = 0; // Deflate compression
  ihdrData[11] = 0; // Standard filter
  ihdrData[12] = 0; // Non-interlaced
  const ihdrChunk = createChunk('IHDR', ihdrData);

  // IDAT chunk
  const compressed = zlib.deflateSync(rawData);
  const idatChunk = createChunk('IDAT', compressed);

  // IEND chunk
  const iendChunk = createChunk('IEND', Buffer.alloc(0));

  return Buffer.concat([signature, ihdrChunk, idatChunk, iendChunk]);
}

function generateICO(pngBuffers) {
  // ICO format with embedded PNGs (supported by Windows Vista and up)
  const count = pngBuffers.length;
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); // Reserved
  header.writeUInt16LE(1, 2); // 1 = ICO type
  header.writeUInt16LE(count, 4); // Number of images

  const entries = [];
  let offset = 6 + count * 16;

  for (const { size, png } of pngBuffers) {
    const entry = Buffer.alloc(16);
    entry[0] = size >= 256 ? 0 : size; // Width (0 for 256)
    entry[1] = size >= 256 ? 0 : size; // Height
    entry[2] = 0; // Color count (0 for >=8bpp)
    entry[3] = 0; // Reserved
    entry.writeUInt16LE(1, 4); // Color planes
    entry.writeUInt16LE(32, 6); // Bits per pixel
    entry.writeUInt32LE(png.length, 8); // Size of image data
    entry.writeUInt32LE(offset, 12); // Offset of image data
    entries.push(entry);
    offset += png.length;
  }

  return Buffer.concat([
    header,
    ...entries,
    ...pngBuffers.map(b => b.png)
  ]);
}

const assetsDir = path.join(__dirname, '..', 'assets');
if (!fs.existsSync(assetsDir)) {
  fs.mkdirSync(assetsDir, { recursive: true });
}

console.log('Generating Edge Light icons...');
const png256 = generateRingPNG(256);
const png64 = generateRingPNG(64);
const png32 = generateRingPNG(32);
const png16 = generateRingPNG(16);

fs.writeFileSync(path.join(assetsDir, 'icon.png'), png256);
console.log('Created assets/icon.png (256x256)');

fs.writeFileSync(path.join(assetsDir, 'tray-icon.png'), png32);
console.log('Created assets/tray-icon.png (32x32)');

const icoBuffer = generateICO([
  { size: 256, png: png256 },
  { size: 64, png: png64 },
  { size: 32, png: png32 },
  { size: 16, png: png16 }
]);
fs.writeFileSync(path.join(assetsDir, 'icon.ico'), icoBuffer);
console.log('Created assets/icon.ico with multi-resolution PNG directory');
