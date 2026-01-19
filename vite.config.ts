import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig(({ mode }) => ({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: 'index.html',
        terms: 'terms/index.html',
        privacy: 'privacy/index.html',
        survey: 'survey/index.html',
      }
    }
  },
  server: {
    proxy: mode === 'development' ? {
      '/api': {
        target: 'http://localhost:8788',
        changeOrigin: true,
      }
    } : undefined
  }
}))
