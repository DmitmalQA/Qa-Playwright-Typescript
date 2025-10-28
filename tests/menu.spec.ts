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
    test('Logging out of logged in user', async ({ }) => {
        await header.clickMenuButton()
        await header.clickLogoutButton()
        await header.checkURL("https://www.saucedemo.com/")
        await header.checkAttriubute(loginPage.userNameField, 'placeholder', 'Username')
        await header.checkAttriubute(loginPage.passwordField, 'placeholder', 'Password')
        await header.checkText(loginPage.loginButton, "Login")
    })
})