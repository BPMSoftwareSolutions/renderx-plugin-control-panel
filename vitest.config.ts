import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    include: ['__tests__/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['node_modules', 'dist'],
  },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
      { find: /^@renderx-plugins\/canvas-component$/, replacement: '/__tests__/__mocks__/@renderx-plugins/canvas-component.ts' },
      { find: /^@renderx-plugins\/canvas-component\//, replacement: '/__tests__/__mocks__/@renderx-plugins/canvas-component/' },
      // Map tests' relative json-components imports to local fixtures
      { find: /^\.\.\/\.\.\/\.\.\/json-components\//, replacement: '/__tests__/__fixtures__/json-components/' },
    ],
  },
});
