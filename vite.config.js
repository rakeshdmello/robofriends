import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // The site is published at https://rakeshdmello.github.io/robofriends/
  base: '/robofriends/',
  css: {
    lightningcss: {
      // Tachyons contains old Internet Explorer hacks (e.g. `*zoom: 1`) that modern
      // browsers ignore; drop them instead of failing the build.
      errorRecovery: true,
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './src/setupTests.js',
  },
});
