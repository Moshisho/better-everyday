import { test, expect } from '@playwright/test';
import * as fs from 'fs';
import * as path from 'path';
import * as crypto from 'crypto';
import { fileURLToPath } from 'url';
import { dirname } from 'path';


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

test.describe('CV Download Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv.html');
    await page.waitForSelector('.cv-content', { timeout: 5000 });
    
    // Wait for CV content to load
    await expect(page.locator('.cv-content')).not.toContainText('Loading CV...');
  });

  test('should download TXT file when clicking Download TXT button', async ({ page }) => {
    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent('download');
    
    // Click the download TXT button
    await page.locator('#download-cv').click();
    
    // Wait for the download to complete
    const download = await downloadPromise;
    
    // Verify download properties
    expect(download.suggestedFilename()).toBe('Moshe_Azaria_CV.txt');
    
    // Save the download to verify content
    const downloadPath = path.join(__dirname, 'temp', 'downloaded_cv.txt');
    await download.saveAs(downloadPath);
    
    // Verify file was downloaded and exists
    expect(fs.existsSync(downloadPath)).toBe(true);
    
    // Read the downloaded content
    const downloadedContent = fs.readFileSync(downloadPath, 'utf8');
    
    // Read the original CV file for comparison
    const originalPath = path.join(__dirname, '..', 'public', 'resources', 'cv.txt');
    const originalContent = fs.readFileSync(originalPath, 'utf8');
    
    // Verify content matches (using SHA256 hash for exact comparison)
    const downloadedHash = crypto.createHash('sha256').update(downloadedContent).digest('hex');
    const originalHash = crypto.createHash('sha256').update(originalContent).digest('hex');
    
    expect(downloadedHash).toBe(originalHash);
    
    // Verify it contains expected key content
    expect(downloadedContent).toContain(`
│  ███╗   ███╗ ██████╗ ███████╗██╗  ██╗███████╗                               │
│  ████╗ ████║██╔═══██╗██╔════╝██║  ██║██╔════╝                               │
│  ██╔████╔██║██║   ██║███████╗███████║█████╗                                 │
│  ██║╚██╔╝██║██║   ██║╚════██║██╔══██║██╔══╝                                 │
│  ██║ ╚═╝ ██║╚██████╔╝███████║██║  ██║███████╗                               │
│  ╚═╝     ╚═╝ ╚═════╝ ╚══════╝╚═╝  ╚═╝╚══════╝                               │
`);
    expect(downloadedContent).toContain('Automation, QA & DevOps Team Lead');
    expect(downloadedContent).toContain('moshisho84@gmail.com');
    expect(downloadedContent).toContain('B.Sc in Physics');
    expect(downloadedContent).toContain('Sage');
    
    // Clean up
    fs.unlinkSync(downloadPath);
  });

  test('should download PDF file when clicking Download PDF button', async ({ page }) => {
    // Start waiting for download before clicking
    const downloadPromise = page.waitForEvent('download');
    
    // Click the download PDF button
    await page.locator('#download-pdf').click();
    
    // Wait for the download to complete
    const download = await downloadPromise;
    
    // Verify download properties
    expect(download.suggestedFilename()).toBe('Moshe_Azaria_CV.pdf');
    
    // Save the download to verify it's a valid PDF
    const downloadPath = path.join(__dirname, 'temp', 'downloaded_cv.pdf');
    await download.saveAs(downloadPath);
    
    // Verify file was downloaded and exists
    expect(fs.existsSync(downloadPath)).toBe(true);
    
    // Read the downloaded file
    const downloadedBuffer = fs.readFileSync(downloadPath);
    
    // Verify it's a valid PDF by checking PDF header
    const pdfHeader = downloadedBuffer.subarray(0, 4).toString();
    expect(pdfHeader).toBe('%PDF');
    
    // Verify file has reasonable size (should be more than just header)
    expect(downloadedBuffer.length).toBeGreaterThan(1000);
    
    // Clean up
    fs.unlinkSync(downloadPath);
  });

  test('should display both download buttons correctly', async ({ page }) => {
    // Verify both buttons exist and are visible
    await expect(page.locator('#download-cv')).toBeVisible();
    await expect(page.locator('#download-pdf')).toBeVisible();
    
    // Verify button text
    await expect(page.locator('#download-cv')).toContainText('Download TXT');
    await expect(page.locator('#download-pdf')).toContainText('Download PDF');
    
    // Verify they're in the same container
    const actionsContainer = page.locator('.cv-actions');
    await expect(actionsContainer).toContainText('Download TXT');
    await expect(actionsContainer).toContainText('Download PDF');
  });
});
