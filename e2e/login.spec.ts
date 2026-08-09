import { expect, test } from '@playwright/test';

const EMAIL = process.env.E2E_EMAIL;
const PASSWORD = process.env.E2E_PASSWORD;

test.describe('логин', () => {
    test('с верными кредами уводит на главную и показывает приветствие', async ({
        page,
    }) => {
        test.skip(
            !EMAIL || !PASSWORD,
            'Нужны E2E_EMAIL и E2E_PASSWORD — см. .env.e2e.example',
        );

        await page.goto('/login');

        await page.getByLabel('Email').fill(EMAIL as string);
        await page.getByLabel('Пароль').fill(PASSWORD as string);

        const loginResponse = page.waitForResponse(
            (res) =>
                res.url().includes('/api/auth/login') && res.request().method() === 'POST',
        );
        await page.getByRole('button', { name: 'Войти', exact: true }).click();
        expect((await loginResponse).status()).toBe(200);

        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByText(/Привет,/)).toBeVisible();
        // токен доступа осел в localStorage
        await expect
            .poll(() => page.evaluate(() => localStorage.getItem('token')))
            .toBeTruthy();
    });

    test('с неверным паролем показывает ошибку и оставляет на /login', async ({
        page,
    }) => {
        test.skip(!EMAIL, 'Нужен E2E_EMAIL — см. .env.e2e.example');

        await page.goto('/login');

        await page.getByLabel('Email').fill(EMAIL as string);
        await page.getByLabel('Пароль').fill('заведомо-неверный-пароль');
        await page.getByRole('button', { name: 'Войти', exact: true }).click();

        await expect(page.getByRole('alert')).toBeVisible();
        await expect(page).toHaveURL(/\/login$/);
        await expect(
            page.evaluate(() => localStorage.getItem('token')),
        ).resolves.toBeNull();
    });
});
