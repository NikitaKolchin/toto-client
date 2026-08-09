import { expect, test } from '@playwright/test';

test.describe('неавторизованный пользователь', () => {
    test('на главной видит карточку «Авторизация» с кнопкой входа', async ({
        page,
    }) => {
        await page.goto('/');

        const authCard = page
            .locator('.MuiCard-root')
            .filter({ hasText: 'Авторизация' });

        await expect(authCard).toBeVisible();
        await expect(authCard).toContainText('Необходимо авторизоваться');

        await authCard.getByRole('button', { name: 'Войти' }).click();
        await expect(page).toHaveURL(/\/login$/);
    });

    test('с приватного роута /stakes редиректится на главную', async ({
        page,
    }) => {
        await page.goto('/stakes');

        // ProtectedRoute уводит на MAIN, пока isAuth === false
        await expect(page).toHaveURL(/\/$/);
        await expect(page.getByText('Ты в Тото!')).toBeVisible();
        await expect(page.getByText('Необходимо авторизоваться')).toBeVisible();
    });
});
