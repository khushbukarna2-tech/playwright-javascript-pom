const { expect } = require("@playwright/test");

class CheckoutPage {
  constructor(page) {
    this.page = page;

    this.fullName = page.getByLabel("Full name");
    this.address = page.getByLabel("Address");
    this.city = page.getByLabel("City");
    this.postal = page.getByLabel("Postal");

    this.payBtn = page.getByRole("button", {
      name: /Pay/i,
    });
  }

  async verifyCheckoutPage() {
    await expect(this.page).toHaveURL(/checkout/);

    await expect(
      this.page.getByRole("heading", {
        name: "Checkout",
      }),
    ).toBeVisible();
  }

  async enterShippingDetails(name, address, city, postal) {
    await this.fullName.fill(name);
    await this.address.fill(address);
    await this.city.fill(city);
    await this.postal.fill(postal);
  }

  async verifyOrderSummary() {
    await expect(this.page.getByText("Order summary")).toBeVisible();

    await expect(this.page.getByText("Subtotal")).toBeVisible();

    await expect(this.page.getByText("Shipping").first()).toBeVisible();

    await expect(this.page.getByText("Tax")).toBeVisible();

    await expect(this.page.getByText("Total", { exact: true })).toBeVisible();

    await expect(this.payBtn).toBeVisible();
  }
}

module.exports = CheckoutPage;
