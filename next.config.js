/** @type {import('next').NextConfig} */
const nextConfig = {
  // lets a second dev server run from the same folder without sharing .next
  distDir: process.env.NEXT_DIST_DIR || '.next',
  // the farm's cloud save talks to Supabase from the browser; the anon key is public by design (RLS guards the rows)
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.SUPABASE_URL || '',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY || '',
  },
}

module.exports = nextConfig
