import test, { expect } from "@playwright/test"
import Header from "../pom/modules/Header.ts"
import { LoginPage } from "../pom/pages/LoginPage.ts"

let header: Header
let loginPage: LoginPage
test.beforeEach(async ({ page }) => {
    header = new Header(page)
    loginPage = new LoginPage(page)
    loginPage.navigateToLoginPage('/')
    loginPage.loginWithCredentials('standard_user', 'secret_sauce')
})
test.describe("Menu test", () => {
    test('Logging out of logged in user', async ({ page }) => {
        await header.clickMenuButton()
        await header.clickLogoutButton()
        await expect(page).toHaveURL("https://www.saucedemo.com/")
        await expect(loginPage.userNameField).toHaveAttribute('placeholder', 'Username')
        await expect(loginPage.passwordField).toHaveAttribute('placeholder', 'Password')
        await expect(loginPage.loginButton).toHaveText("Login")
    })
})