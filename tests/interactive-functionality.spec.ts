import { test, expect } from '@playwright/test';

test.describe('Interactive Terminal Functionality', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/?skip-boot=true');
    await page.waitForSelector('#terminal-input', { timeout: 5000 });
  });

  test('should handle Unix command recognition correctly', async ({ page }) => {
    const terminalInput = page.locator('#terminal-input');
    
    // Test valid Unix command
    await terminalInput.click();
    await terminalInput.fill('ls -la');
    await terminalInput.press('Enter');
    
    // Check for positive response in command output area
    await expect(page.locator('#command-output')).toContainText('That looks like a fine command!');
    await expect(page.locator('#command-output')).toContainText('ls -la');
    
    // Test invalid command
    await terminalInput.fill('hello world');
    await terminalInput.press('Enter');
    
    // Check for negative response in command output area
    await expect(page.locator('#command-output')).toContainText('Nice try...');
    await expect(page.locator('#command-output')).toContainText('hello world');
    
    // Test another valid command
    await terminalInput.fill('git status');
    await terminalInput.press('Enter');
    
    await expect(page.locator('#command-output')).toContainText('git status');
  });

  test('should recognize various Unix commands', async ({ page }) => {
    const terminalInput = page.locator('#terminal-input');
    
    const validCommands = ['pwd', 'mkdir test', 'curl -O file.zip'];
    
    for (const command of validCommands) {
      await terminalInput.fill(command);
      await terminalInput.press('Enter');
      
      // Check that the command appears in output and gets positive response
      await expect(page.locator('#command-output')).toContainText(command);
      await expect(page.locator('#command-output')).toContainText('That looks like a fine command!');
    }
  });

  test('should navigate to CV viewer and back', async ({ page }) => {
    await page.goto('/?skip-boot=true');
    await page.locator('#view-cv').click();
    
    // Should navigate to CV page
    await page.waitForURL('**/cv.html');
    
    // Should see CV viewer page elements
    await expect(page.locator('.cv-content')).toBeVisible();
    await expect(page.locator('#download-cv')).toBeVisible();
    
    await page.locator('text="← Back to Portfolio"').click();
    await expect(page.url()).toContain('skip-boot');
  });

  test('should focus input when clicking in terminal area', async ({ page }) => {
    // Wait for terminal to be ready
    await page.waitForSelector('.terminal-body', { timeout: 5000 });
    
    // Click somewhere in the terminal body
    await page.locator('.terminal-body').click();
    
    // Check that input is focused
    const terminalInput = page.locator('#terminal-input');
    await expect(terminalInput).toBeFocused();
  });

  test('should handle cursor visibility based on input focus', async ({ page }) => {
    // Wait for elements to be ready
    await page.locator('#final-prompt').scrollIntoViewIfNeeded({ timeout: 3000 });
    
    const terminalInput = page.locator('#terminal-input');
    const promptCursor = page.locator('#prompt-cursor');
    
    // Initially cursor should be visible (hidden class)
    await expect(promptCursor).toHaveClass(/hidden/);
    
    // Focus input
    await terminalInput.click();
    
    // Cursor should be hidden when input is focused
    await expect(promptCursor).toHaveCSS('display', 'none');
    
    // Blur input by clicking elsewhere
    await page.locator('.terminal-header').click();
    
    // Cursor should reappear when input is empty and not focused
    await expect(promptCursor).toHaveCSS('display', 'block');
  });

  test('should clear input after command execution', async ({ page }) => {
    
    const terminalInput = page.locator('#terminal-input');
    
    // Type and execute command
    await terminalInput.fill('test command');
    await terminalInput.press('Enter');
    
    // Input should be cleared
    await expect(terminalInput).toHaveValue('');
  });

  test('should scroll to show new command output', async ({ page }) => {
    
    const terminalInput = page.locator('#terminal-input');
    
    // Execute multiple commands to test scrolling
    for (let i = 0; i < 3; i++) {
      await terminalInput.fill(`command${i}`);
      await terminalInput.press('Enter');
      
      // Check that the latest output is visible
      await expect(page.locator(`text=command${i}`)).toBeVisible();
    }
    
    // Verify command output area exists and has content
    const commandOutput = page.locator('#command-output');
    await expect(commandOutput).toBeVisible();
    
    // Should have multiple output entries
    const outputLines = page.locator('#command-output .output');
    await expect(outputLines).toHaveCount(3);
  });
});
