import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig({
  plugins: [react(), tsconfigPaths()],
  server: {
    port: 8080, // Устанавливаем ваш привычный порт
    strictPort: true, // Если 8080 занят, Vite выдаст ошибку, а не откроет 8081
    proxy: {
      '/api': {
        target: 'http://localhost:3000', // Ваш бэкенд
        changeOrigin: true,
      },
    },
  },
});
