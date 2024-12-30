import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
// import eslint from 'vite-plugin-eslint';
import viteTsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  base: './',
  // plugins: [react(), eslint(), viteTsconfigPaths()],
  plugins: [react(), viteTsconfigPaths()],
  server: {
    port: 3000,
  },
  preview: {
    port: 3000,
  },
  assetsInclude: ['**/*.m4a'],
});
