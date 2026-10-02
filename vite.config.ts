import path from 'path';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { handleGenerate } from './api/generate';

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, '.', '');
    if (env.GEMINI_API_KEY) {
      process.env.GEMINI_API_KEY = env.GEMINI_API_KEY;
    }
    return {
      server: {
        port: 3000,
        host: '0.0.0.0',
      },
      plugins: [
        react(),
        {
          name: 'local-generate-api',
          configureServer(server) {
            server.middlewares.use('/api/generate', (request, response) => {
              void handleGenerate(request, response);
            });
          }
        }
      ],
      resolve: {
        alias: {
          '@': path.resolve(__dirname, '.'),
        }
      }
    };
});
