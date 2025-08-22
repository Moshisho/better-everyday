import { test, expect } from '@playwright/test';

test.describe('Resume Website Appearance', () => {
  test('should display complete resume page correctly', async ({ page }) => {
    await page.goto('/');
    
    // Check page title
    await expect(page).toHaveTitle('Moshe Azaria - Terminal Resume');
    
    // Wait for ASCII art to appear (indicates boot sequence is complete)
    await page.waitForSelector('.ascii-art', { timeout: 15000 });
    
    // Take screenshot of the complete page
    await expect(page).toHaveScreenshot('resume-full-page.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should display terminal header correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for terminal header to be ready
    await page.waitForSelector('.terminal-header');
    
    // Screenshot of just the terminal header
    await expect(page.locator('.terminal-header')).toHaveScreenshot('terminal-header.png');
  });

  test('should display ASCII art and main content', async ({ page }) => {
    await page.goto('/');
    
    // Wait for ASCII art to appear (main content loaded)
    await page.waitForSelector('.ascii-art', { timeout: 15000 });
    
    // Screenshot of the main terminal body content
    await expect(page.locator('.terminal-body')).toHaveScreenshot('terminal-main-content.png');
  });

  test('should display download section correctly', async ({ page }) => {
    await page.goto('/');
    
    // Wait for download button to appear
    await page.waitForSelector('#download-pdf', { timeout: 15000 });
    
    // Screenshot of download button and interactive prompt area
    const downloadSection = page.locator('#download-pdf').locator('..').locator('..');
    await expect(downloadSection).toHaveScreenshot('download-section.png');
  });

  test('should have correct colors and styling', async ({ page }) => {
    await page.goto('/');
    
    // Wait for ASCII art to appear (stable content)
    await page.waitForSelector('.ascii-art', { timeout: 15000 });
    
    // Screenshot just the ASCII art area to verify colors without animations
    await expect(page.locator('.ascii-art')).toHaveScreenshot('terminal-colors.png', {
      animations: 'disabled'
    });
  });

  test('should be responsive on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    await page.goto('/');
    
    // Wait for ASCII art to appear (content fully loaded)
    await page.waitForSelector('.ascii-art', { timeout: 15000 });
    
    // Screenshot of mobile layout
    await expect(page).toHaveScreenshot('mobile-layout.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });

  test('should be responsive on tablet', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });
    await page.goto('/');
    
    // Wait for ASCII art to appear (content fully loaded)
    await page.waitForSelector('.ascii-art', { timeout: 15000 });
    
    // Screenshot of tablet layout
    await expect(page).toHaveScreenshot('tablet-layout.png', {
      fullPage: true,
      animations: 'disabled'
    });
  });
});