import { defineConfig } from 'vitest/config';

export default defineConfig({
  resolve: {
    tsconfigPaths: true,
  },
  test: {
    globals: true,
    exclude: ['**/*.e2e.spec.ts', '**/node_modules/**', '**/.git/**'],
    passWithNoTests: true,
  },
});
