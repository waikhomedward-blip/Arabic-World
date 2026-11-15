import { test, expect } from '@playwright/test';
test('title → first scene → reply', async ({ page }) => {
  await page.goto('/');
  await page.getByText('Tap to begin').click();
  await page.getByText('tap Abu Faisal').click();
  await page.getByRole('button', { name: 'next' }).click();
  await page.getByRole('button', { name: 'وَعَلَيْكُمُ السَّلَامُ' }).click();
  await expect(page.locator('.caption.ok')).toBeVisible();
});
