import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: process.env.VITE_DEV_PORT || 5173,
    open: true,
    cors: true,
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
      },
    },
  },

  define: {
    __APP_VERSION__: JSON.stringify(process.env.VITE_APP_VERSION || '1.0.0'),
    __ENVIRONMENT__: JSON.stringify(process.env.VITE_ENVIRONMENT || 'development'),
  },

  // Environment variables
  envDir: '.',
  envPrefix: 'VITE_',
})
