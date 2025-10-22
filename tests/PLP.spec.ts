import test, { expect } from "@playwright/test"

test.beforeEach(async ({ page }) => {
    
    await page.goto('')
    await page.locator('input', {hasNotText: 'Login'}).first().fill('standard_user')
    await page.locator('input', {hasNotText: 'Login'}).last().fill('secret_sauce')
    await page.locator('input', {hasText: 'Login'}).click()

})

test.describe("PLP tests", () => {

    test('PLP test for addition to the cart via "Add to Cart" button. Expected the cart counter to be 1', async ({ page }) => {
        
        await page.locator('button', {hasText: "Add to Cart"}).first().click()
        await expect(page).toHaveURL('/inventory.html')
        await expect(page.locator('span.shopping_cart_badge')).toHaveText('1')
        await expect(page.locator('button', {hasText: "Remove"}).first()).toBeVisible()
        await expect(page.locator('button', {hasText: "Remove"}).first()).toHaveCSS('color', 'rgb(226, 35, 26)')

    })

    test('PLP test for changing filters. Expected the product order to change based on the filter', async ({ page }) => {
        
        await page.locator('select').selectOption("lohi")
        await expect(page.locator('div[data-test="inventory-item-price"]').first()).toHaveText(/7.99/)

    })

})