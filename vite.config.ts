import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: import.meta.env.VITE_BASE_URL || '/',
  build: {
    outDir: 'dist',
  }
})
