import { expect, test } from '@playwright/test';

test.describe('обработка ошибок бэкенда', () => {
    test('ответ без тела показывает алерт, а не роняет страницу', async ({
        page,
    }) => {
        // 502 без тела — так отвечает прокси, когда бэкенд недоступен.
        // Матчим по pathname, а не глобом `**/api/**`: в dev-режиме Vite отдаёт
        // исходники по реальным путям, и под такой глоб попадает src/shared/api/*.
        await page.route(
            (url) => url.pathname.startsWith('/api/'),
            (route) => route.fulfill({ status: 502, body: '' }),
        );

        const crashes: string[] = [];
        page.on('pageerror', (err) => crashes.push(err.message));

        await page.goto('/login');
        await page.getByLabel('Email').fill('кто-то@example.com');
        await page.getByLabel('Пароль').fill('какой-то-пароль');
        await page.getByRole('button', { name: 'Войти', exact: true }).click();

        const alert = page.getByRole('alert');
        await expect(alert).toBeVisible();
        await expect(alert).not.toBeEmpty();

        // форма на месте — ErrorBoundary не подменил дерево
        await expect(page.getByLabel('Email')).toBeVisible();
        expect(crashes).toEqual([]);
    });
});
