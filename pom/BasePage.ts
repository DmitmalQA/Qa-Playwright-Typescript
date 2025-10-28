import { Page, Locator, expect } from "@playwright/test"

export default class BasePage {
    protected readonly page: Page

    constructor(page: Page){
        this.page = page
    }

    async verifyCSS(element: Locator, style: string, value: string){
        await expect(element).toHaveCSS(style, value)
    }

    async checkVisibility(element: Locator){
        await expect(element).toBeVisible()
    }

    async checkText(element: Locator, text: string | RegExp){
        await expect(element).toHaveText(text)
    }

    async checkHidden(element: Locator){
        await expect(element).toBeHidden()
    }

    async checkURL(URL: string | RegExp){
        await expect(this.page).toHaveURL(URL)
    }

    async checkAttriubute(element: Locator, attribute: string, value: string | RegExp){
        await expect(element).toHaveAttribute(attribute, value)
    }
}