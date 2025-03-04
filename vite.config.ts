import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: 'https://github.com/shaggun/l-player',
  build: {
    outDir: 'dist',
  }
})
