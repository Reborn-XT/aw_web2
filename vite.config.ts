import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// Plugin to copy index.html to 404.html for seamless GitHub Pages SPA routing on page reload
const copy404Plugin = () => ({
  name: 'copy-404-plugin',
  closeBundle() {
    const dist = path.resolve(__dirname, 'dist')
    const indexHtml = path.join(dist, 'index.html')
    const notFoundHtml = path.join(dist, '404.html')
    if (fs.existsSync(indexHtml)) {
      fs.copyFileSync(indexHtml, notFoundHtml)
    }
  },
})

// https://vite.dev/config/
export default defineConfig({
  base: '/aw_web2/',
  plugins: [react(), tailwindcss(), copy404Plugin()],
  server: {
    watch: {
      ignored: ['**/resources/**', '**/artist_poses_raw/**'],
    },
  },
})
