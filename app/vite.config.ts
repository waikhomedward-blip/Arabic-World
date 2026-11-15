import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  root: __dirname,
  base: './',
  plugins: [react()],
  server: { port: 5173, fs: { allow: ['..'] } },
  build: { outDir: 'dist', emptyOutDir: true, chunkSizeWarningLimit: 1500 },
});
