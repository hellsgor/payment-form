import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  base: './',
  server: {
    host: '0.0.0.0',
  },
  css: {
    devSourcemap: true,
  },
  resolve: {
    alias: {
      '@styles': resolve(__dirname, '/src/styles'),
    },
  },
});
