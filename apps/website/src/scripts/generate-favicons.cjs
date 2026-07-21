const sharp = require("sharp");
const path = require("path");

const SRC_LOGO = path.join(__dirname, "..", "..", "public", "Assets", "Logos", "Transparent logos", "Icon-only_version_Logo_transparent.png");
const PUBLIC_DIR = path.join(__dirname, "..", "..", "public");

async function generateFavicons() {
  console.log("Generating favicons from:", SRC_LOGO);
  
  try {
    // Generate standard favicons in public directory
    await sharp(SRC_LOGO).resize(192, 192).toFile(path.join(PUBLIC_DIR, "icon-192.png"));
    await sharp(SRC_LOGO).resize(512, 512).toFile(path.join(PUBLIC_DIR, "icon-512.png"));
    await sharp(SRC_LOGO).resize(180, 180).toFile(path.join(PUBLIC_DIR, "apple-touch-icon.png"));
    
    // Create logo.png
    await sharp(SRC_LOGO).resize(512, 512).toFile(path.join(PUBLIC_DIR, "logo.png"));

    // Create favicon.ico (Sharp doesn't natively output .ico easily, but for basic web, a 32x32 png renamed to .ico often works in modern browsers, or we can just use icon.png)
    // We will generate a 32x32 png as favicon.ico
    await sharp(SRC_LOGO).resize(32, 32).toFormat("png").toFile(path.join(PUBLIC_DIR, "favicon.ico"));

    console.log("Favicons generated successfully in public directory!");
  } catch (error) {
    console.error("Error generating favicons:", error);
  }
}

generateFavicons();
