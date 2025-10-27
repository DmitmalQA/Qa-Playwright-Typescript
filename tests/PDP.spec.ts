import test, { expect } from "@playwright/test"
import { LoginPage } from "../pom/pages/LoginPage.ts"
import Header from "../pom/modules/Header.ts"
import { ProductsListingPage } from "../pom/pages/ProductsListingPage.ts"
import { ProductsDetailPage } from "../pom/pages/ProductDetailPage.ts"

let loginPage: LoginPage
let productListingPage: ProductsListingPage
let header: Header
let productDetailPage: ProductsDetailPage
test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productListingPage = new ProductsListingPage(page)
    header = new Header(page)
    productDetailPage = new ProductsDetailPage(page)   
    await loginPage.navigateToLoginPage('/')
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce')
    await productListingPage.goToProductPage()
})

test.describe("PDP tests", () => {
    test('PDP test for addition to the cart via "Add to Cart" button. Expected to cart counter to be 1', async ({ }) => {
        const removeButton = await productDetailPage.getRemoveButton()
        await productDetailPage.clickAddToCartButton()
        await expect(header.cartIcon).toHaveText('1')
        await expect(removeButton).toBeVisible()
        await expect(removeButton).toHaveCSS('color', 'rgb(226, 35, 26)')
    })
    test('PDP test for removal from the cart via "Remove" button. Expected the cart counter to disappear', async ({ }) => {
        const addToCartButton = await productDetailPage.getAddToCartButton()
        await productDetailPage.clickAddToCartButton()
        await productDetailPage.clickRemoveButton()
        await expect(header.cartIcon).toBeHidden()
        await expect(addToCartButton).toBeVisible()
        await expect(addToCartButton).toHaveCSS('color', 'rgb(19, 35, 34)')
    })
})

/*test.describe("PDP tests", () => {
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
})*/