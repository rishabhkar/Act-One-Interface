import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    // Allow LAN access for real-device testing (phone -> your PC on Wi‑Fi).
    host: true,
    proxy: {
      '/api': {
        target: process.env.VITE_API_BASE_URL ?? 'http://192.168.29.55:8080',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  preview: {
    // Allow LAN access for `npm run preview --host`
    host: true,
    port: 4175,
  },
  build: {
    outDir: 'dist',
    // OneDrive/Windows can lock files in outDir causing sporadic EPERM/ENOTEMPTY on cleanup.
    // We keep stale assets harmlessly content-hashed; clean manually when needed.
    emptyOutDir: false,
  },
})