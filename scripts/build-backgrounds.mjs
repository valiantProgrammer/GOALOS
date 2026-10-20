import fs from "fs";
import path from "path";
import sharp from "sharp";

const SOURCE_IMAGE = path.resolve("apps/web/public/pagebackground.png");
const TARGET_DIRS = [
  path.resolve("apps/web/public/backgrounds"),
  path.resolve("public/backgrounds"),
];

TARGET_DIRS.forEach((dir) => fs.mkdirSync(dir, { recursive: true }));

async function buildBackgrounds() {
  console.log(`Processing background assets from: ${SOURCE_IMAGE}`);

  // Copy original as goalos-bg-original.png
  for (const dir of TARGET_DIRS) {
    fs.copyFileSync(SOURCE_IMAGE, path.join(dir, "goalos-bg-original.png"));
    console.log(`Saved goalos-bg-original.png to ${dir}`);
  }

  const image = sharp(SOURCE_IMAGE);
  const metadata = await image.metadata();
  const { width = 2752, height = 1536 } = metadata;

  console.log(`Source dimensions: ${width}x${height}`);

  // 1. bg-full-2560.webp: 2560px wide, lanczos3, slight sharpen, quality 82
  const fullBuffer = await sharp(SOURCE_IMAGE)
    .resize(2560, null, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1, m1: 0.5, m2: 0.5 })
    .webp({ quality: 82 })
    .toBuffer();

  // 2. bg-blur-1280.webp: 1280px wide, blurred sigma ~8, quality 70
  const blurBuffer = await sharp(SOURCE_IMAGE)
    .resize(1280, null, { kernel: sharp.kernel.lanczos3 })
    .blur(8)
    .webp({ quality: 70 })
    .toBuffer();

  // 3. poster-hunter.webp: portrait crop (3:4) on the right side containing hunter silhouette
  // Crop width: 1152, height: 1536, right aligned (left = width - 1152)
  const cropW = Math.round(height * 0.75); // 1152 for 1536 height
  const hunterLeft = width - cropW;
  const posterHunterBuffer = await sharp(SOURCE_IMAGE)
    .extract({ left: hunterLeft, top: 0, width: cropW, height })
    .resize(768, 1024, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1, m1: 0.5, m2: 0.5 })
    .webp({ quality: 82 })
    .toBuffer();

  // 4. poster-castle.webp: portrait crop (3:4) centered on castle and moon
  const castleLeft = Math.round(width * 0.35); // ~963
  const posterCastleBuffer = await sharp(SOURCE_IMAGE)
    .extract({ left: castleLeft, top: 0, width: cropW, height })
    .resize(768, 1024, { kernel: sharp.kernel.lanczos3 })
    .sharpen({ sigma: 1, m1: 0.5, m2: 0.5 })
    .webp({ quality: 82 })
    .toBuffer();

  // Save all to target directories
  for (const dir of TARGET_DIRS) {
    fs.writeFileSync(path.join(dir, "bg-full-2560.webp"), fullBuffer);
    fs.writeFileSync(path.join(dir, "bg-blur-1280.webp"), blurBuffer);
    fs.writeFileSync(path.join(dir, "poster-hunter.webp"), posterHunterBuffer);
    fs.writeFileSync(path.join(dir, "poster-castle.webp"), posterCastleBuffer);
    console.log(`Saved optimized WebP assets to ${dir}`);
  }

  console.log("Background assets build complete!");
}

buildBackgrounds().catch((err) => {
  console.error("Build backgrounds error:", err);
  process.exit(1);
});
