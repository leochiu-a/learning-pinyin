import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages 把網站放在 /learning-pinyin/ 底下
export default defineConfig({
  base: '/learning-pinyin/',
  plugins: [react()],
});
