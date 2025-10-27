import { Locator } from "@playwright/test"
import BasePage from "../BasePage";

export class ProductsListingPage extends BasePage {
    private readonly addToCartButton: Locator = this.page.locator('button', {hasText: "Add to Cart"})
    private readonly removeButton: Locator = this.page.locator('button', {hasText: "Remove"})
    private readonly selector: Locator = this.page.locator('select')
    private readonly productPrice: Locator = this.page.locator('div[data-test="inventory-item-price"]')
    private readonly productLink: Locator = this.page.locator('a#item_4_title_link')

    async clickAddToCartButton(index: number){
        await this.addToCartButton.nth(index).click()
    }
    
    async removeButtonAssignment(index: number){
        return await this.removeButton.nth(index) 
    }

    async selectFilter(optionValue: string){
        await this.selector.selectOption(optionValue)
    }

    async getProductPrices(){
        return await this.productPrice.allTextContents()
    }

    async checkProductOrderByPriceAscending(){
        const pricesText = await this.getProductPrices()
        const prices = pricesText.map(price => parseFloat(price.replace('$', '')))
        const sortedPrices = [...prices].sort((a, b) => a - b)
        return JSON.stringify(prices) === JSON.stringify(sortedPrices)
    }

    async goToProductPage(){
        await this.productLink.click()
    }
}