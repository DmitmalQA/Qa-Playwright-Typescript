import test, { expect } from "@playwright/test"
test.beforeEach(async ({ page }) => {   
    await page.goto('')
    await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_user')
    await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
    await page.locator('input', {hasText: 'Login'}).click()
    await page.locator('a#item_4_title_link').click()
})
test.describe("PDP tests", () => {
    test('PDP test for addition to the cart via "Add to Cart" button. Expected to cart counter to be 1', async ({ page }) => {
        await page.locator('button', {hasText: "Add to Cart"}).click()
        await expect(page).toHaveURL('/inventory-item.html?id=4')
        await expect(page.locator('span.shopping_cart_badge')).toHaveText('1')
        await expect(page.locator('button', {hasText: "Remove"})).toBeVisible()
        await expect(page.locator('button', {hasText: "Remove"})).toHaveCSS('color', 'rgb(226, 35, 26)')
    })
    test('PDP test for removal from the cart via "Remove" button. Expected the cart counter to disappear', async ({ page }) => {
        await page.locator('button', {hasText: "Add to Cart"}).click()
        await page.locator('button', {hasText: "Remove"}).click()
        await expect(page).toHaveURL('/inventory-item.html?id=4')
        await expect(page.locator('span.shopping_cart_badge')).toBeHidden()
        await expect(page.locator('button', {hasText: "Add to Cart"})).toBeVisible()
        await expect(page.locator('button', {hasText: "Add to Cart"})).toHaveCSS('color', 'rgb(19, 35, 34)')
    })
})