import test, { expect } from "@playwright/test"
test.beforeEach(async ({ page }) => {

    await page.goto('')
    await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_user')
    await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
    await page.locator('input', {hasText: 'Login'}).click()

})
test.describe("Menu test", () => {
    test('Logging out of logged in user', async ({ page }) => {
        
        await page.locator('button#react-burger-menu-btn').click()
        await page.locator('a[data-test="logout-sidebar-link"]').click()
        await expect(page).toHaveURL("https://www.saucedemo.com/")
        await expect(page.locator('input#user-name')).toHaveAttribute('placeholder', 'Username')
        await expect(page.locator('input#password')).toHaveAttribute('placeholder', 'Password')
        await expect(page.locator('input#login-button')).toHaveText("Login")

    })
})