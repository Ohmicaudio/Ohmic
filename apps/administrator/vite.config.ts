import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  test: {
    exclude: ['dist/**', 'dist-node/**', 'node_modules/**'],
    testTimeout: 15000,
  },
  server: {
    port: 5180,
    proxy: {
      '/api': {
        target: 'http://localhost:5181',
        changeOrigin: true,
      },
    },
  },
})
