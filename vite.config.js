import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false,
    allowedHosts: ['terminal.local']
  },
  preview: {
    host: '0.0.0.0',
    port: 4173,
    strictPort: false
  },
  build: {
    manifest: true,
    chunkSizeWarningLimit: 500
  }
});
