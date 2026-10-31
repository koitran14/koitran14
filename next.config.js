/** @type {import('next').NextConfig} */
const nextConfig = {
  // lets a second dev server run from the same folder without sharing .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
}

module.exports = nextConfig
