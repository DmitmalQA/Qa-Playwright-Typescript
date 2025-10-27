import { Locator } from "@playwright/test"
import BasePage from "../BasePage";

export class LoginPage extends BasePage {
    public readonly userNameField: Locator = this.page.locator('input[data-test="username"]')
    public readonly passwordField: Locator = this.page.locator('input[data-test="password"]')
    public readonly loginButton: Locator = this.page.locator('input[data-test="login-button"]')
    public readonly errorMessage: Locator = this.page.locator('h3[data-test="error"]')
    public readonly errorIconUsername : Locator = this.page.locator('input[data-test="username"]+svg[data-icon="times-circle"]')
    public readonly errorIconPassword: Locator = this.page.locator('input[data-test="password"]+svg[data-icon="times-circle"]')

    async enterUsername(username: string){
        await this.userNameField.fill(username)
    }

    async enterPassword(password: string){
        await this.passwordField.fill(password)
    }

    async clickLoginButton(){
        await this.loginButton.click()
    }

    async loginWithCredentials(username: string, password: string){
        await this.enterUsername(username)
        await this.enterPassword(password)
        await this.clickLoginButton()
    }

    async navigateToLoginPage(url: string){
        await this.page.goto(url)
    }
}