import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
  root: '.',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    target: 'es2020',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/gsap')) return 'gsap';
          if (id.includes('node_modules/@studio-freight/lenis')) return 'lenis';
        },
      },
    },
  },
  assetsInclude: ['**/*.webm', '**/*.webp'],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
