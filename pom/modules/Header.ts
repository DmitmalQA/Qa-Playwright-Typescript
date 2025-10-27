import { Locator } from "@playwright/test";
import BasePage from "../BasePage";

export default class Header extends BasePage {

    public readonly cartIcon: Locator = this.page.locator('span.shopping_cart_badge')
    private readonly menuButton: Locator = this.page.locator('button#react-burger-menu-btn')
    private readonly logoutButton: Locator = this.page.locator('a[data-test="logout-sidebar-link"]')

    async clickMenuButton(){
        await this.menuButton.click()
    }

    async clickLogoutButton(){
        await this.logoutButton.click()
    }   
}