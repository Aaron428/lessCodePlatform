import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@shared': resolve(__dirname, '/src/shared'),
      '@store': resolve(__dirname, '/src/store'),
      '@container': resolve(__dirname, '/src/container')
    }
  },
  server: {
    port: 10009
  }
})
