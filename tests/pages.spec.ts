import test, { expect } from "@playwright/test"

test.describe("PLP tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('')
        await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_user')
        await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
        await page.locator('input', {hasText: 'Login'}).click()
    })

    test('PLP test for addition to the cart via "Add to Cart" button. Expected to change the cart counter after adding a product', async ({ page }) => {
        await page.locator('button', {hasText: "Add to Cart"}).first().click()
        await expect(page).toHaveURL('/inventory.html')
        await expect(page.locator('span.shopping_cart_badge')).toHaveText('1')
        await expect(page.locator('button', {hasText: "Remove"}).first()).toBeVisible()
        await expect(page.locator('button', {hasText: "Remove"}).first()).toHaveCSS('color', 'rgb(226, 35, 26)')
    })

    test('PLP test for changing filters. Expected to change the filter to lowest price first and have first product changed as a result', async ({ page }) => {
        await page.locator('select').selectOption("lohi")
        await expect(page.locator('div[data-test="inventory-item-price"]').first()).toHaveText(/7.99/)
    })

})

test.describe("PDP tests", () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('')
        await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_user')
        await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
        await page.locator('input', {hasText: 'Login'}).click()
        await page.locator('a#item_4_title_link').click()
    })

    test('PDP test for addition to the cart via "Add to Cart" button. Expected to change the cart counter after adding a product', async ({ page }) => {
        await page.locator('button', {hasText: "Add to Cart"}).click()
        await expect(page).toHaveURL('/inventory-item.html?id=4')
        await expect(page.locator('span.shopping_cart_badge')).toHaveText('1')
        await expect(page.locator('button', {hasText: "Remove"})).toBeVisible()
        await expect(page.locator('button', {hasText: "Remove"})).toHaveCSS('color', 'rgb(226, 35, 26)')
    })

    test('PDP test for removal from the cart via "Remove" button. Expected to change the cart counter after adding a product', async ({ page }) => {
        await page.locator('button', {hasText: "Add to Cart"}).click()
        await page.locator('button', {hasText: "Remove"}).click()
        await expect(page).toHaveURL('/inventory-item.html?id=4')
        await expect(page.locator('span.shopping_cart_badge')).toBeHidden()
        await expect(page.locator('button', {hasText: "Add to Cart"})).toBeVisible()
        await expect(page.locator('button', {hasText: "Add to Cart"})).toHaveCSS('color', 'rgb(19, 35, 34)')
    })

})

test.describe("Menu test", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('')
        await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_user')
        await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
        await page.locator('input', {hasText: 'Login'}).click()
    })

    test('Logging out of logged in user', async ({ page }) => {
        await page.locator('button#react-burger-menu-btn').click()
        await page.locator('a[data-test="logout-sidebar-link"]').click()
        await expect(page).toHaveURL("https://www.saucedemo.com/")
        await expect(page.locator('input#user-name')).toHaveAttribute('placeholder', 'Username')
        await expect(page.locator('input#password')).toHaveAttribute('placeholder', 'Password')
        await expect(page.locator('input#login-button')).toHaveText("Login")
    })
})