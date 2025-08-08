import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  server: {
    port: 3000,
    open: true,
    host: true,
    strictPort: true,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
  esbuild: {
    // Skip TypeScript checking during development
    logOverride: { 'this-is-undefined-in-esm': 'silent' }
  }
})
