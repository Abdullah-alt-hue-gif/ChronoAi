import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:3000';

test.describe('TC-001: User Authentication & Security Guard', () => {
    test('should redirect unauthenticated users to login', async ({ page }) => {
        await page.goto(`${BASE_URL}/dashboard`);
        await page.waitForURL(/\/login/);
        await expect(page).toHaveURL(/login/);
    });

    test('should show error on invalid login', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'invalid@example.com');
        await page.fill('input[type="password"]', 'wrongpassword');
        await page.click('button[type="submit"]');

        // Check for specific error message or general failure text
        await expect(page.locator('text=Incorrect email or password')).toBeVisible();
    });

    test('should login successfully with valid credentials', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');

        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
        await expect(page).toHaveURL(/dashboard/, { timeout: 30000 });
    });
});

test.describe('TC-002: Multi-Step Event Creation Flow', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
    });

    test('should complete the event creation wizard', async ({ page }) => {
        await page.goto(`${BASE_URL}/wizard`);

        // Step 1: Select Conference Type
        await page.click('h3:has-text("Conference")');

        // Step 2: Configure Event
        await expect(page.locator('text=Conference Configuration')).toBeVisible();
        await page.fill('input[name="eventName"]', 'E2E Test Conference');
        await page.fill('input[name="startDate"]', '2026-10-10T09:00');
        await page.fill('input[name="endDate"]', '2026-10-10T17:00');

        // Fill sessions in the expected format: Title | Speaker | Duration | Priority | Room
        const sessions = "AI Ethics | Dr. Brown | 45 | 3 | Hall A\nFuture of Web | Jane Doe | 60 | 2 | Room 101";
        await page.fill('textarea[name="sessions"]', sessions);

        await page.click('button:has-text("Generate Schedule")');

        // Step 3: Verify Optimized Schedule
        await expect(page.locator('text=Optimized Schedule')).toBeVisible({ timeout: 30000 });
        await expect(page.locator('text=AI Ethics')).toBeVisible({ timeout: 30000 });
    });
});

test.describe('TC-005: Intelligent Conflict Analysis & Feedback', () => {
    test('should show conflict analysis in the results view', async ({ page }) => {
        // We reuse the wizard flow to get to the results
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button:has-text("Sign In")');

        await page.goto(`${BASE_URL}/wizard`);
        await page.click('h3:has-text("Conference")');
        await page.fill('input[name="eventName"]', 'Conflict Test');
        await page.fill('input[name="startDate"]', '2026-11-10T09:00');
        await page.fill('input[name="endDate"]', '2026-11-10T17:00');

        // Create an obvious conflict if possible, or just check the panel existence
        await page.fill('textarea[name="sessions"]', "Overlapping 1 | Speaker | 60 | 3 | Hall A\nOverlapping 2 | Speaker | 60 | 3 | Hall A");
        await page.click('button:has-text("Generate Schedule")');

        // Check for explainability or conflict panels
        await expect(page.locator('text=Optimized Schedule')).toBeVisible({ timeout: 30000 });
        // The explainability panel is usually visible if rules were applied
        await expect(page.locator('text=AI Reasoning').or(page.locator('text=Conflict'))).toBeVisible({ timeout: 30000 });
    });
});
