import { readFileSync, writeFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, dirname, relative } from "node:path";
import { fileURLToPath } from "node:url";

/* =========================================================================
   Generates src/data/imageSizes.json — every case-study image mapped to its
   real pixel size.

   The detail page lays each frame out at the picture's own aspect ratio so
   nothing is cropped, which means it needs the dimensions before the image
   loads. Typing them by hand is exactly the kind of chore a CMS should never
   hand to the person writing the content, so they are read straight out of
   the file headers here instead.

   No dependencies: PNG, JPEG and WebP all state their size in the first few
   bytes, so this just parses the headers.

   Runs automatically before `npm run dev` and `npm run build`.
   ========================================================================= */

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const SCAN_DIR = join(root, "public/assets/cs");
const OUT = join(root, "src/data/imageSizes.json");

function pngSize(buf) {
  // 8-byte signature, then the IHDR chunk: width and height as big-endian u32
  if (buf.readUInt32BE(0) !== 0x89504e47) return null;
  return { w: buf.readUInt32BE(16), h: buf.readUInt32BE(20) };
}

function jpegSize(buf) {
  if (buf.readUInt16BE(0) !== 0xffd8) return null;
  let i = 2;
  while (i < buf.length - 9) {
    if (buf[i] !== 0xff) {
      i += 1;
      continue;
    }
    const marker = buf[i + 1];
    // SOFn frame headers carry the dimensions; C4/C8/CC are not frames
    const isFrame = marker >= 0xc0 && marker <= 0xcf && marker !== 0xc4 && marker !== 0xc8 && marker !== 0xcc;
    if (isFrame) return { h: buf.readUInt16BE(i + 5), w: buf.readUInt16BE(i + 7) };
    i += 2 + buf.readUInt16BE(i + 2);
  }
  return null;
}

function webpSize(buf) {
  if (buf.toString("ascii", 0, 4) !== "RIFF" || buf.toString("ascii", 8, 12) !== "WEBP") return null;
  const fmt = buf.toString("ascii", 12, 16);
  if (fmt === "VP8 ") return { w: buf.readUInt16LE(26) & 0x3fff, h: buf.readUInt16LE(28) & 0x3fff };
  if (fmt === "VP8L") {
    const b = buf.readUInt32LE(21);
    return { w: (b & 0x3fff) + 1, h: ((b >> 14) & 0x3fff) + 1 };
  }
  if (fmt === "VP8X") return { w: (buf.readUIntLE(24, 3) & 0xffffff) + 1, h: (buf.readUIntLE(27, 3) & 0xffffff) + 1 };
  return null;
}

const measure = (file) => {
  const buf = readFileSync(file);
  return pngSize(buf) || jpegSize(buf) || webpSize(buf);
};

const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const full = join(dir, name);
    if (statSync(full).isDirectory()) walk(full, out);
    else if (/\.(png|jpe?g|webp)$/i.test(name)) out.push(full);
  }
  return out;
};

const sizes = {};
let failed = 0;

if (existsSync(SCAN_DIR)) {
  for (const file of walk(SCAN_DIR)) {
    const key = "/" + relative(join(root, "public"), file).split(/[\\/]/).join("/");
    const size = measure(file);
    if (size) sizes[key] = size;
    else {
      failed += 1;
      console.warn(`  ! could not read dimensions: ${key}`);
    }
  }
}

const ordered = Object.fromEntries(Object.keys(sizes).sort().map((k) => [k, sizes[k]]));
writeFileSync(OUT, JSON.stringify(ordered, null, 2) + "\n");
console.log(`  image sizes  ${Object.keys(ordered).length} measured${failed ? `, ${failed} failed` : ""}`);
