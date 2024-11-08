import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://social-media-z5a2.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '/api'),
        secure: false
      },
      '/assets': {
        target: 'https://social-media-z5a2.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/assets/, '/assets'),
        secure: false
      }
    }
  },
})
