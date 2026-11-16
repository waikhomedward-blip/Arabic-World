// Renders app/public/icons/icon.svg to the PNG sizes iPhone and Android need. Usage: npx tsx tools/make-icons.ts
import { chromium } from '@playwright/test';
import { readFileSync } from 'node:fs';
const svg = readFileSync('app/public/icons/icon.svg', 'utf8');
const browser = await chromium.launch();
for (const size of [180, 192, 512]) {
  const page = await browser.newPage({ viewport: { width: size, height: size } });
  await page.setContent(`<html><body style="margin:0">${svg.replace('<svg ', `<svg width="${size}" height="${size}" `)}</body></html>`);
  await page.screenshot({ path: `app/public/icons/icon-${size}.png`, omitBackground: true });
  await page.close();
}
await browser.close();
console.log('icons written');
