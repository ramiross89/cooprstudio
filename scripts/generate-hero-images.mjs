import { createWriteStream, mkdirSync } from "node:fs";
import { deflateSync } from "node:zlib";

const width = 1600;
const height = 900;
const outputDir = new URL("../public/images/", import.meta.url);

const themes = [
  {
    file: "hero-build.png",
    base: [10, 28, 34],
    glow: [31, 122, 104],
    accent: [31, 122, 104],
    offset: 0.1,
  },
  {
    file: "hero-launch.png",
    base: [13, 20, 32],
    glow: [62, 111, 180],
    accent: [31, 122, 104],
    offset: 0.45,
  },
  {
    file: "hero-support.png",
    base: [17, 28, 24],
    glow: [69, 156, 137],
    accent: [236, 103, 79],
    offset: 0.72,
  },
];

function crc32(buffer) {
  let crc = -1;
  for (let i = 0; i < buffer.length; i += 1) {
    crc ^= buffer[i];
    for (let j = 0; j < 8; j += 1) {
      crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
    }
  }
  return (crc ^ -1) >>> 0;
}

function chunk(type, data) {
  const typeBuffer = Buffer.from(type);
  const length = Buffer.alloc(4);
  const crc = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  crc.writeUInt32BE(crc32(Buffer.concat([typeBuffer, data])));
  return Buffer.concat([length, typeBuffer, data, crc]);
}

function writePng(path, pixels) {
  const header = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8;
  ihdr[9] = 6;

  const raw = Buffer.alloc((width * 4 + 1) * height);
  for (let y = 0; y < height; y += 1) {
    const rowStart = y * (width * 4 + 1);
    raw[rowStart] = 0;
    pixels.copy(raw, rowStart + 1, y * width * 4, (y + 1) * width * 4);
  }

  const png = Buffer.concat([
    header,
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);

  createWriteStream(path).end(png);
}

function clamp(value) {
  return Math.max(0, Math.min(255, Math.round(value)));
}

function render(theme) {
  const pixels = Buffer.alloc(width * height * 4);
  const orbX = width * (0.62 + theme.offset * 0.16);
  const orbY = height * (0.26 + theme.offset * 0.18);

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const nx = x / width;
      const ny = y / height;
      const radial = Math.max(
        0,
        1 - Math.hypot((x - orbX) / 760, (y - orbY) / 520),
      );
      const beam = Math.max(0, 1 - Math.abs(ny - 0.22 - nx * 0.18) * 5.5);
      const grid =
        (x % 96 < 2 || y % 96 < 2) && x > width * 0.36 ? 0.16 : 0;
      const diagonal =
        Math.sin((x * 0.018 + y * 0.022 + theme.offset * 12)) > 0.965 ? 0.22 : 0;
      const grain = ((x * 37 + y * 17) % 29) / 29;

      const index = (y * width + x) * 4;
      pixels[index] = clamp(
        theme.base[0] +
          theme.glow[0] * radial * 0.82 +
          theme.accent[0] * beam * 0.12 +
          24 * grid +
          28 * diagonal +
          grain * 5,
      );
      pixels[index + 1] = clamp(
        theme.base[1] +
          theme.glow[1] * radial * 0.82 +
          theme.accent[1] * beam * 0.12 +
          24 * grid +
          28 * diagonal +
          grain * 5,
      );
      pixels[index + 2] = clamp(
        theme.base[2] +
          theme.glow[2] * radial * 0.82 +
          theme.accent[2] * beam * 0.12 +
          24 * grid +
          28 * diagonal +
          grain * 5,
      );
      pixels[index + 3] = 255;
    }
  }

  return pixels;
}

mkdirSync(outputDir, { recursive: true });

for (const theme of themes) {
  writePng(new URL(theme.file, outputDir), render(theme));
}
