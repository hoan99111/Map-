import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: ['styled-components'], // Thêm hỗ trợ styled-components
      },
    }),
  ],
});