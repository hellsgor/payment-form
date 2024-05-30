import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@styles': resolve(__dirname, '/src/styles'),
    },
  },
});
