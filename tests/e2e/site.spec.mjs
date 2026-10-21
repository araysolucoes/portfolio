import { test, expect } from '@playwright/test';

test('site carrega com título e seções principais', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveTitle(/Aray Soluções/);
  await expect(page.locator('main')).toBeVisible();
  await expect(page.locator('#portfolio .project-card')).toHaveCount(6);
  await expect(page.locator('#contato')).toHaveCount(1);
});

test('skip link leva ao conteúdo principal', async ({ page }) => {
  await page.goto('/');
  await page.keyboard.press('Tab');
  await expect(page.locator('.skip-link')).toBeFocused();
  await page.keyboard.press('Enter');
  await expect(page).toHaveURL(/#main$/);
});

test('links dos projetos são seguros e presentes', async ({ page }) => {
  await page.goto('/');
  const links = page.locator('#portfolio a[href^="https://github.com/llongaray/"]');
  await expect(links).toHaveCount(6);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute('rel', /noopener/);
    await expect(link).toHaveAttribute('target', '_blank');
  }
});

test('contatos possuem destinos esperados', async ({ page }) => {
  await page.goto('/');
  const whatsapp = page.locator('a[href^="https://wa.me/"]');
  expect(await whatsapp.count()).toBeGreaterThan(0);
  for (const link of await whatsapp.all()) await expect(link).toHaveAttribute('href', /wa.me\/5551994841638/);
  expect(await page.locator('a[href^="mailto:aray.solucoes@gmail.com"]').count()).toBeGreaterThan(0);
});

test('menu mobile abre, fecha e navega', async ({ page, isMobile }) => {
  test.skip(!isMobile, 'Apenas viewport mobile');
  await page.goto('/');
  const button = page.locator('#navToggle');
  await expect(button).toBeVisible();
  await button.click();
  await expect(button).toHaveAttribute('aria-expanded', 'true');
  await page.keyboard.press('Escape');
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await button.click();
  await page.locator('#navMenu a[href="#portfolio"]').click();
  await expect(button).toHaveAttribute('aria-expanded', 'false');
  await expect(page).toHaveURL(/#portfolio$/);
});

test('sem rolagem horizontal no viewport inicial', async ({ page }) => {
  await page.goto('/');
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth + 2);
  expect(overflow).toBe(false);
});
