const { expect } = require("@playwright/test");

class ProductsPage {
  constructor(page) {
    this.page = page;

    this.searchBox = page.getByPlaceholder("Search products, categories…");

    this.productCards = page.locator('button:has-text("Add to cart")');

    this.cart = page.getByRole("link", {
      name: "Cart",
    });
  }

  async verifyProductsPage() {
    await expect(this.page).toHaveURL(/products/);

    await expect(
      this.page.getByRole("heading", {
        name: "Products",
      }),
    ).toBeVisible();

    await expect(this.searchBox).toBeVisible();

    await expect(this.productCards.first()).toBeVisible();

    console.log("Total Products:", await this.productCards.count());
  }

  async openCart() {
    await this.cart.click();
  }
}

module.exports = ProductsPage;
