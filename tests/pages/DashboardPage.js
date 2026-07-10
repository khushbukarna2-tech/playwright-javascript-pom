const { expect } = require("@playwright/test");

class DashboardPage {
  constructor(page) {
    this.page = page;

    this.products = page.getByRole("link", { name: "Products" });
    this.settings = page.getByRole("link", { name: "Settings" });
  }

  async verifyDashboard() {
    await expect(this.page).toHaveURL(/dashboard/);

    await expect(this.page.getByText("Revenue")).toBeVisible();
    await expect(this.page.getByText("Orders")).toBeVisible();
    await expect(this.page.getByText("Refunds")).toBeVisible();

    await expect(this.page.getByText("Operations")).toBeVisible();
    await expect(
      this.page.getByText("shipments awaiting pickup"),
    ).toBeVisible();

    await expect(this.page.getByText("Activity")).toBeVisible();
    await expect(this.page.getByText("Inventory sync completed")).toBeVisible();

    await expect(
      this.page.getByRole("button", {
        name: "Reorder widgets",
      }),
    ).toBeVisible();
  }

  async clickProducts() {
    await this.products.click();
  }

  async clickSettings() {
    await this.settings.click();
  }
}

module.exports = DashboardPage;
