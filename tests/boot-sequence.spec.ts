import { test, expect } from '@playwright/test';

test.describe('Boot Sequence Animation', () => {
  test('should display boot sequence before main content', async ({ page }) => {
    await page.goto('/');
    
    // Check that boot sequence container exists
    await expect(page.locator('.boot-sequence')).toBeVisible();
    
    // Wait for boot messages to appear
    await expect(page.locator('text=Initializing ./resume')).toBeVisible({ timeout: 15000 });
    await expect(page.locator('text=Loading professional experience')).toBeVisible();
    await expect(page.locator('text=Mounting skills database')).toBeVisible();
    await expect(page.locator('text=Establishing network connections')).toBeVisible();
    await expect(page.locator('text=System ready. Welcome!')).toBeVisible();
    
    // After boot sequence, main content should appear
    await expect(page.locator('.ascii-art')).toBeVisible({ timeout: 5000 });
  });

  test('should complete boot sequence within reasonable time', async ({ page }) => {
    const startTime = Date.now();
    
    await page.goto('/');
    await expect(page.locator('text=[  OK  ]')).toHaveCount(5, {timeout: 11000});
    
    // Wait for main content to appear (boot sequence complete)
    await page.waitForSelector('.ascii-art', { timeout: 15000 });
    
    const endTime = Date.now();
    const bootTime = endTime - startTime;
    
    // Boot sequence should complete within 15 seconds
    expect(bootTime).toBeLessThan(15000);
  });

  test('should maintain terminal authenticity during boot', async ({ page }) => {
    await page.goto('/');
    
    // Check terminal structure during boot
    await expect(page.locator('.terminal-header')).toBeVisible();
    await expect(page.locator('.terminal-title')).toContainText('moshe@resume:~$ better-everyday');
    
    // Check that terminal styling is applied during boot
    const terminalBody = page.locator('.terminal-body');
    await expect(terminalBody).toHaveCSS('background-color', 'rgb(13, 17, 23)');
    
    // Boot messages should appear in terminal green
    const bootMessage = page.locator('text=Initializing ./resume').first();
    await expect(bootMessage).toBeVisible();
  });
});
