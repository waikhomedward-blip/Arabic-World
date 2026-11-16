import { defineConfig, devices } from '@playwright/test';
// Suites V (visual/visibility), P (performance proxy) and G-UI (real play-through). See lab/LIMITATIONS.md.
const GPU = ['--use-angle=metal', '--ignore-gpu-blocklist', '--enable-gpu'];
export default defineConfig({
  testDir: 'tests/e2e',
  timeout: 90_000,
  fullyParallel: true,
  workers: 2, // more parallel browsers starve the GPU and cause false 'context lost' failures (LESSONS.md #13)
  reporter: [['list']],
  webServer: { command: 'npx vite app --port 5174 --strictPort', port: 5174, reuseExistingServer: true },
  use: { baseURL: 'http://localhost:5174' },
  projects: [
    { name: 'iphone-webkit', use: { ...devices['iPhone 13'] } },
    { name: 'iphone-se-webkit', use: { ...devices['iPhone SE'] } },
    { name: 'ipad-webkit', use: { ...devices['iPad (gen 7) landscape'] } },
    { name: 'android-chromium', use: { ...devices['Pixel 7'], launchOptions: { args: GPU } } },
    { name: 'budget-android-chromium', use: { ...devices['Moto G4'], launchOptions: { args: GPU } } },
  ],
});
