import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  // eslint-disable-next-line no-undef
  plugins: [react()],
  // Add the PostCSS plugin
});

// require('postcss')
