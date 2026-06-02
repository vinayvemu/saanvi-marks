import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import compression from 'vite-plugin-compression'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    // Generate .gz files alongside every asset ≥ 1 kB
    compression({ algorithm: 'gzip', ext: '.gz', threshold: 1024 }),
    // Also generate .br (Brotli) for servers that support it
    compression({ algorithm: 'brotliCompress', ext: '.br', threshold: 1024 }),
  ],

  build: {
    rollupOptions: {
      output: {
        // rolldown (Vite 8) requires manualChunks as a function
        manualChunks(id) {
          if (id.includes('node_modules/react/') || id.includes('node_modules/react-dom/')) {
            return 'react-vendor'
          }
          if (id.includes('node_modules/react-router')) {
            return 'react-router'
          }
          if (id.includes('node_modules/firebase/auth')) {
            return 'firebase-auth'
          }
          if (id.includes('node_modules/firebase/firestore')) {
            return 'firebase-firestore'
          }
          if (id.includes('node_modules/firebase/storage')) {
            return 'firebase-storage'
          }
          if (id.includes('node_modules/firebase/')) {
            return 'firebase-app'
          }
        },
      },
    },
    // Warn on chunks > 500 kB (default 500); helps catch regressions
    chunkSizeWarningLimit: 500,
  },
})
