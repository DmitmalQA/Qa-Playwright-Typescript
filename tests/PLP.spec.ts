import test, { expect } from "@playwright/test"
import { LoginPage } from "../pom/pages/LoginPage.ts"
import { ProductsListingPage } from "../pom/pages/ProductsListingPage.ts"
import Header from "../pom/modules/Header.ts"

let loginPage: LoginPage
let productListingPage: ProductsListingPage
let header: Header

test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page)
    productListingPage = new ProductsListingPage(page)
    header = new Header(page)
    await loginPage.navigateToLoginPage('/')
    await loginPage.loginWithCredentials('standard_user', 'secret_sauce')
})
test.describe("PLP tests", () => {
    test('PLP test for addition to the cart via "Add to Cart" button. Expected the cart counter to be 1', async ({ }) => {
        let index = 0
        const removeButton = await productListingPage.removeButtonAssignment(index)
        await productListingPage.clickAddToCartButton(index)
        await productListingPage.checkText(header.cartIcon, `${index + 1}`)
        await productListingPage.checkVisibility(removeButton)
        await productListingPage.verifyCSS(removeButton, 'color', 'rgb(226, 35, 26)')
    })
    test('PLP test for changing filters. Expected the product order to change based on the filter', async ({ }) => {
        await productListingPage.selectFilter('lohi')
        await expect(productListingPage.checkProductOrderByPriceAscending()).resolves.toBe(true)
    })
})