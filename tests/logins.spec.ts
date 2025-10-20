import test, { expect } from "@playwright/test"

test.describe("Successful Login", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('')
    })
    test('Successful authorisation of a proper user with correct pair of credentials', async ({ page }) => {
        await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_user')
        await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
        await page.locator('input', {hasText: 'Login'}).click()
        await expect(page).toHaveURL('/inventory.html')
    })

})

test.describe("Unsuccessful Logins with Missing or Incorrect Data", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('')
    })

    test.afterEach(async ({ page }) => {
        await page.locator('input', {hasText: 'Login'}).click()
        await expect(page.locator('h3[data-test="error"]')).toHaveText(/((Password|Username) is required|Username and password do not match)/)
        await expect(page.locator('input[data-test="username"]')).toHaveCSS('border-bottom-color', 'rgb(226, 35, 26)')
        await expect(page.locator('input[data-test="password"]')).toHaveCSS('border-bottom-color', 'rgb(226, 35, 26)')
        await expect(page.locator('svg[data-icon="times-circle"]')).toBeDefined()
    })

    test('Submission of the login form without any login. Expected username error.', async ({ page }) => {
        await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
    })

    test('Submission of the login form without any password. Expected password error.', async ({ page }) => {
        await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_use')
    })

    test('Submission of incorrect Username and Password in the login form. Expected not match error.', async ({ page }) => {
        await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_user')
        await page.locator('input', {hasNotText: 'Login'}).last().fill('123123123')
    })
})

test.describe("Login with other users data", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('')
    })

    test('Locked out user login attempt. Expected error that the user is locked out', async ({ page }) => {
        await page.locator('input', {hasNotText: 'Login'}).first().fill('locked_out_user')
        await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
        await page.locator('input', {hasText: 'Login'}).click()
        await expect(page.locator('h3[data-test="error"]')).toHaveText(/locked out/)
    })

    /*test('Problematic user', async ({ page }) => {
        await page.locator('input', {hasNotText: 'Login'}).first().fill('problem_user')
        await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
        await page.locator('input', {hasText: 'Login'}).click()
        await page.locator('button', {hasText: "Add to Cart"}).first().click()
        await page.locator('button', {hasText: "Remove"}).first().click()
        await expect(page.locator('span[class="shopping_cart_badge"]')).toHaveText('1') //checking the wrong input on purpose to pass the test to prove that the product is not removed from the cart on click of "Remove"
    })*/

})