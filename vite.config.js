import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),tailwindcss()],

  //proxy server
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:9006',
        changeOrigin: true,
        secure: false
      }
    }
  }
})
