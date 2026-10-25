/// <reference types="vitest" />
import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'

// https://vitejs.dev/config https://vitest.dev/config
export default defineConfig(({ mode }) => {
  // `/` for Netlify and local development, `/cirkelvanimpact/` for a project
  // site on GitHub Pages. Set VITE_BASE_PATH to override.
  const env = loadEnv(mode, process.cwd(), '')
  const base = env.VITE_BASE_PATH || '/'

  return {
    base,
    plugins: [react(), tsconfigPaths()],
    server: {
      port: 5173
    },
    test: {
      globals: true,
      environment: 'happy-dom',
      setupFiles: '.vitest/setup',
      include: ['src/**/*.test.{ts,tsx}']
    }
  }
})
