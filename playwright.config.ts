import { defineConfig, devices } from '@playwright/test';
// Suite P/G end-to-end. Browsers are not downloaded yet: run `npx playwright install chromium webkit` first.
export default defineConfig({
  testDir: 'tests/e2e',
  webServer: { command: 'npx vite app --port 5174 --strictPort', port: 5174, reuseExistingServer: true },
  use: { baseURL: 'http://localhost:5174' },
  projects: [
    { name: 'iphone-webkit', use: { ...devices['iPhone 13'] } },
    { name: 'android-chromium', use: { ...devices['Pixel 7'] } },
  ],
});
