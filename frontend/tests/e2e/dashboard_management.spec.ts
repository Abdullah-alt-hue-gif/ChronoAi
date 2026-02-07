import { test, expect } from '@playwright/test';

const BASE_URL = 'http://127.0.0.1:3000';

test.describe('TC-006: Dashboard Event Management', () => {
    test.beforeEach(async ({ page }) => {
        // Login before each test
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
    });

    test('should display dashboard with seed demo button', async ({ page }) => {
        await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
        await expect(page.locator('button:has-text("Seed Demo Event")')).toBeVisible();
        await expect(page.locator('button:has-text("Create New Event")')).toBeVisible();
    });

    test('should seed demo event successfully', async ({ page }) => {
        // Seed demo event
        await page.click('button:has-text("Seed Demo Event")');
        
        // Wait for success message or event to appear
        await expect(page.locator('text=Demo event seeded successfully')).toBeVisible({ timeout: 30000 });
        
        // Verify event appears in the table
        await expect(page.locator('text=Hackathon 2026 (Demo)')).toBeVisible({ timeout: 10000 });
    });

    test('should delete event from dashboard', async ({ page }) => {
        // First seed an event if none exists
        const eventCount = await page.locator('table tbody tr').count();
        if (eventCount === 0) {
            await page.click('button:has-text("Seed Demo Event")');
            await expect(page.locator('text=Demo event seeded successfully')).toBeVisible({ timeout: 30000 });
        }

        // Get the first event
        const firstRow = page.locator('table tbody tr').first();
        const eventName = await firstRow.locator('td:first-child').textContent();
        
        // Click delete button
        await firstRow.locator('button:has-text("Delete")').click();
        
        // Confirm deletion in modal
        await expect(page.locator('text=Delete Event')).toBeVisible();
        await expect(page.locator('text=This action cannot be undone')).toBeVisible();
        await page.click('button:has-text("Delete Event")');
        
        // Verify success message and event is removed
        await expect(page.locator('text=Event deleted successfully')).toBeVisible();
        await expect(page.locator(`text=${eventName}`)).not.toBeVisible();
    });

    test('should navigate to event management', async ({ page }) => {
        // First seed an event if none exists
        const eventCount = await page.locator('table tbody tr').count();
        if (eventCount === 0) {
            await page.click('button:has-text("Seed Demo Event")');
            await expect(page.locator('text=Demo event seeded successfully')).toBeVisible({ timeout: 30000 });
        }

        // Click manage button
        await page.locator('table tbody tr').first().locator('button:has-text("Manage")').click();
        
        // Should navigate to wizard with event ID
        await expect(page).toHaveURL(/\/wizard\?eventId=/);
        await expect(page.locator('text=Configure Event')).toBeVisible();
    });
});

test.describe('TC-007: Entity Management', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
        
        // Seed demo event first
        await page.goto(`${BASE_URL}/dashboard`);
        await page.click('button:has-text("Seed Demo Event")');
        await expect(page.locator('text=Demo event seeded successfully')).toBeVisible({ timeout: 30000 });
        
        // Navigate to entities page
        await page.click('a:has-text("Entities")');
    });

    test('should display entities page with add functionality', async ({ page }) => {
        await expect(page.locator('h1:has-text("Entities")')).toBeVisible();
        await expect(page.locator('button:has-text("Add Entity")')).toBeVisible();
    });

    test('should add new entity successfully', async ({ page }) => {
        // Click add entity button
        await page.click('button:has-text("Add Entity")');
        
        // Fill entity form
        await page.selectOption('select[name="entityType"]', 'venue');
        await page.fill('input[name="name"]', 'Test Venue');
        await page.fill('input[name="capacity"]', '100');
        
        // Submit form
        await page.click('button:has-text("Add Entity")');
        
        // Verify success message and new entity appears
        await expect(page.locator('text=Entity added successfully')).toBeVisible();
        await expect(page.locator('text=Test Venue')).toBeVisible();
    });

    test('should update existing entity', async ({ page }) => {
        // Wait for entities to load or add one if none exist
        await page.waitForTimeout(2000);
        
        const entityCount = await page.locator('.entity-card').count();
        if (entityCount === 0) {
            // Add a test entity first
            await page.click('button:has-text("Add Entity")');
            await page.selectOption('select[name="entityType"]', 'venue');
            await page.fill('input[name="name"]', 'Update Test Venue');
            await page.fill('input[name="capacity"]', '50');
            await page.click('button:has-text("Add Entity")');
            await expect(page.locator('text=Entity added successfully')).toBeVisible();
            await page.waitForTimeout(1000);
        }

        // Click edit button on first entity
        await page.locator('.entity-card').first().locator('button:has-text("Edit")').click();
        
        // Update entity details
        await page.fill('input[name="name"]', 'Updated Venue Name');
        await page.click('button:has-text("Update Entity")');
        
        // Verify update
        await expect(page.locator('text=Entity updated successfully')).toBeVisible();
        await expect(page.locator('text=Updated Venue Name')).toBeVisible();
    });
});

test.describe('TC-008: Calendar Integration & Schedule Visualization', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
        
        // Seed demo event with schedule
        await page.goto(`${BASE_URL}/dashboard`);
        await page.click('button:has-text("Seed Demo Event")');
        await expect(page.locator('text=Demo event seeded successfully')).toBeVisible({ timeout: 30000 });
    });

    test('should display calendar view with scheduled sessions', async ({ page }) => {
        // Navigate to calendar page
        await page.click('a:has-text("Calendar")');
        
        // Verify calendar view is loaded
        await expect(page.locator('.calendar-view')).toBeVisible({ timeout: 10000 });
        
        // Check for scheduled events on calendar
        await expect(page.locator('.calendar-event')).toBeVisible();
    });

    test('should navigate from calendar to session details', async ({ page }) => {
        // Navigate to calendar page
        await page.click('a:has-text("Calendar")');
        await expect(page.locator('.calendar-view')).toBeVisible({ timeout: 10000 });
        
        // Click on first scheduled event
        await page.locator('.calendar-event').first().click();
        
        // Should navigate to session details page
        await expect(page).toHaveURL(/\/dashboard\/sessions\/\d+/);
        await expect(page.locator('h1:has-text("Session Details")')).toBeVisible();
    });

    test('should reflect newly generated schedule in calendar', async ({ page }) => {
        // Navigate to wizard to generate new schedule
        await page.goto(`${BASE_URL}/wizard`);
        
        // Select an event type and generate schedule
        await page.click('h3:has-text("Workshop")');
        await expect(page.locator('text=Workshop Configuration')).toBeVisible();
        
        await page.fill('input[name="eventName"]', 'Calendar Test Event');
        await page.fill('input[name="startDate"]', '2026-12-15T09:00');
        await page.fill('input[name="endDate"]', '2026-12-15T17:00');
        
        // Add sessions
        const sessions = "Morning Session | Instructor A | 90 | 3 | Main Hall\nAfternoon Session | Instructor B | 90 | 2 | Room 101";
        await page.fill('textarea[name="sessions"]', sessions);
        
        await page.click('button:has-text("Generate Schedule")');
        
        // Wait for schedule generation
        await expect(page.locator('text=Optimized Schedule')).toBeVisible({ timeout: 30000 });
        
        // Navigate to calendar and verify new events appear
        await page.goto(`${BASE_URL}/dashboard/calendar`);
        await expect(page.locator('.calendar-view')).toBeVisible({ timeout: 10000 });
        await expect(page.locator('text=Morning Session')).toBeVisible();
        await expect(page.locator('text=Afternoon Session')).toBeVisible();
    });
});

test.describe('TC-009: Schedule Generation Integrity', () => {
    test('should handle scheduling failures gracefully', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
        
        // Create impossible scheduling scenario
        await page.goto(`${BASE_URL}/wizard`);
        await page.click('h3:has-text("Tournament")');
        
        await page.fill('input[name="eventName"]', 'Impossible Schedule Test');
        await page.fill('input[name="startDate"]', '2026-12-15T09:00');
        await page.fill('input[name="endDate"]', '2026-12-15T10:00'); // Only 1 hour for 4 matches
        
        // Create teams and matches that can't fit
        const teams = "Team A\nTeam B\nTeam C\nTeam D";
        await page.fill('textarea[name="teams"]', teams);
        
        const matches = "Team A vs Team B\nTeam C vs Team D\nTeam A vs Team C\nTeam B vs Team D";
        await page.fill('textarea[name="matches"]', matches);
        
        await page.click('button:has-text("Generate Schedule")');
        
        // Should show failure message instead of broken schedule
        await expect(page.locator('text=Scheduling Failed')).toBeVisible({ timeout: 30000 });
        await expect(page.locator('text=Fail-Safe Triggered')).toBeVisible();
        await expect(page.locator('text=Suggested Fixes')).toBeVisible();
    });

    test('should show schedule when constraints are reasonable', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
        
        // Create reasonable scheduling scenario
        await page.goto(`${BASE_URL}/wizard`);
        await page.click('h3:has-text("Conference")');
        
        await page.fill('input[name="eventName"]', 'Reasonable Schedule Test');
        await page.fill('input[name="startDate"]', '2026-12-15T09:00');
        await page.fill('input[name="endDate"]', '2026-12-15T17:00'); // 8 hours
        
        // Add reasonable sessions
        const sessions = "Keynote | Speaker A | 60 | 3 | Main Hall\nWorkshop A | Speaker B | 90 | 2 | Room 101\nLunch | - | 60 | 1 | Main Hall";
        await page.fill('textarea[name="sessions"]', sessions);
        
        await page.click('button:has-text("Generate Schedule")');
        
        // Should show successful schedule
        await expect(page.locator('text=Optimized Schedule')).toBeVisible({ timeout: 30000 });
        await expect(page.locator('text=Keynote')).toBeVisible();
        await expect(page.locator('text=Workshop A')).toBeVisible();
        await expect(page.locator('text=Lunch')).toBeVisible();
    });
});

test.describe('TC-010: Cross-Platform Navigation', () => {
    test('should maintain state across page navigation', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
        
        // Navigate to different pages and return
        await page.click('a:has-text("About")');
        await expect(page).toHaveURL(/\/about/);
        
        await page.goBack();
        await expect(page).toHaveURL(/\/dashboard/);
        await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
        
        // Navigate to entities and back
        await page.click('a:has-text("Entities")');
        await expect(page.locator('h1:has-text("Entities")')).toBeVisible();
        
        await page.goBack();
        await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
    });

    test('should handle browser refresh gracefully', async ({ page }) => {
        await page.goto(`${BASE_URL}/login`);
        await page.fill('input[type="email"]', 'testuser@example.com');
        await page.fill('input[type="password"]', 'testpassword123');
        await page.click('button[type="submit"]');
        await page.waitForURL(/\/dashboard/, { timeout: 30000 });
        
        // Refresh the page
        await page.reload();
        
        // Should still be logged in and see dashboard
        await expect(page.locator('h1:has-text("Dashboard")')).toBeVisible();
        await expect(page).toHaveURL(/\/dashboard/);
    });
});