const { expect } = require("@playwright/test");

class LoginPage {
  constructor(page) {
    this.page = page;

    this.signInBtn = page.getByRole("button", { name: "Sign in" });
  }

  async navigate() {
    await this.page.goto("https://retail-website-fawn.vercel.app/login");
  }

  async verifyLoginPage() {
    await expect(this.page).toHaveTitle("retailwebsite");
    await expect(this.page).toHaveURL(/fawn/);
  }

  async login() {
    await this.signInBtn.click();
  }
}

module.exports = LoginPage;
