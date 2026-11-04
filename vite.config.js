import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // three.js (renderer + core) tetap ~526 kB minified walau di-tree-shake,
    // dan hanya dimuat lazy setelah teks hero tampil. Naikkan ambang peringatan
    // ke batas wajar chunk vendor itu agar build tidak berisik.
    chunkSizeWarningLimit: 540,
    rollupOptions: {
      output: {
        // three.js dipisah ke chunk sendiri (dimuat lazy oleh hero) supaya
        // bundle awal tetap ringan dan chunk-nya bisa di-cache lintas rilis.
        manualChunks(id) {
          if (id.includes('node_modules/three')) return 'three';
          return undefined;
        },
      },
    },
  },
  server: {
    // 5173 dipakai project lain di mesin ini, jadi dev server pakai 5180.
    // strictPort: kalau 5180 terpakai, Vite gagal jelas alih-alih diam-diam
    // pindah port tanpa kita sadari.
    port: 5180,
    strictPort: true,
    proxy: {
      // Port API dipindah dari 5000 ke 5100 (lihat server/.env).
      '/api': 'http://localhost:5100',
    },
  },
});
