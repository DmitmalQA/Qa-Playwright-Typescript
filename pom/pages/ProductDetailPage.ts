import { Locator } from "@playwright/test"
import BasePage from "../BasePage";

export class ProductsDetailPage extends BasePage {
    private readonly addToCartButton: Locator = this.page.locator('button', {hasText: "Add to Cart"})
    private readonly removeButton: Locator = this.page.locator('button', {hasText: "Remove"})


    async clickAddToCartButton(){
        await this.addToCartButton.click()
    }

    async clickRemoveButton(){
        await this.removeButton.click()
    }

    async getRemoveButton(){
        return this.removeButton
    }

    async getAddToCartButton(){
        return this.addToCartButton
    }
}