const { expect } = require("@playwright/test");

class SettingsPage {
  constructor(page) {
    this.page = page;

    this.signOut = page.getByRole("button", {
      name: "Sign out",
    });
  }

  async verifySettings() {
    await expect(this.page).toHaveURL(/settings/);

    await expect(this.signOut).toBeVisible();
  }
}

module.exports = SettingsPage;
