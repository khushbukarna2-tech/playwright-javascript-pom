const { expect } = require("@playwright/test");

class CartPage {
  constructor(page) {
    this.page = page;

    this.checkout = page.getByRole("link", {
      name: "Checkout",
    });
  }

  async verifyCart() {
    await expect(this.page).toHaveURL(/cart/);

    await expect(
      this.page.getByRole("heading", {
        name: "Your cart",
      }),
    ).toBeVisible();
  }

  async clickCheckout() {
    await this.checkout.click();
  }
}

module.exports = CartPage;
