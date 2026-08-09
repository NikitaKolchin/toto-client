import fs from 'node:fs';
import path from 'node:path';
import { defineConfig, devices } from '@playwright/test';

// Простой загрузчик .env.e2e — чтобы не тащить зависимость dotenv.
// Файл в .gitignore, туда кладутся креды тестового аккаунта.
const envPath = path.join(__dirname, '.env.e2e');
if (fs.existsSync(envPath)) {
    for (const line of fs.readFileSync(envPath, 'utf-8').split('\n')) {
        const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
        if (!match) continue;
        const [, key, rawValue = ''] = match;
        if (process.env[key] === undefined) {
            process.env[key] = rawValue.trim().replace(/^["']|["']$/g, '');
        }
    }
}

const BASE_URL = process.env.E2E_BASE_URL ?? 'http://localhost:8080';

export default defineConfig({
    testDir: './e2e',
    fullyParallel: true,
    forbidOnly: !!process.env.CI,
    retries: process.env.CI ? 2 : 0,
    workers: process.env.CI ? 1 : undefined,
    reporter: process.env.CI ? 'list' : [['html', { open: 'never' }], ['list']],
    use: {
        baseURL: BASE_URL,
        trace: 'on-first-retry',
        screenshot: 'only-on-failure',
        locale: 'ru-RU',
    },
    projects: [
        {
            name: 'chromium',
            use: { ...devices['Desktop Chrome'] },
        },
    ],
    // Vite сам проксирует /api на бэкенд (см. vite.config.ts).
    // Если dev-сервер уже поднят — переиспользуем его.
    webServer: {
        command: 'npm start',
        url: BASE_URL,
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
    },
});
