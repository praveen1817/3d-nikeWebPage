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
        manualChunks: {
          gsap:  ['gsap'],
          lenis: ['@studio-freight/lenis'],
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
