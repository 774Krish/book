import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Served from https://<user>.github.io/book/, so built asset URLs need the
  // repository name in front of them. Local dev ignores this and stays at '/'.
  base: '/book/',
  server: {
    // Forward /api/* to the local API server (npm run dev:api) so frontend
    // code can always call fetch('/api/contact'), in dev and in production.
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
})
