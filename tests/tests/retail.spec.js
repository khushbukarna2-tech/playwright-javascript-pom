const { test } = require("@playwright/test");

const LoginPage = require("../pages/LoginPage");
const DashboardPage = require("../pages/DashboardPage");
const ProductsPage = require("../pages/ProductsPage");
const CartPage = require("../pages/CartPage");
const CheckoutPage = require("../pages/CheckoutPage");
const SettingsPage = require("../pages/SettingsPage");

test("Verify Retail Website", async ({ page }) => {
  const login = new LoginPage(page);
  const dashboard = new DashboardPage(page);
  const products = new ProductsPage(page);
  const cart = new CartPage(page);
  const checkout = new CheckoutPage(page);
  const settings = new SettingsPage(page);

  await login.navigate();
  await login.verifyLoginPage();
  await login.login();

  await dashboard.verifyDashboard();

  await dashboard.clickProducts();
  await products.verifyProductsPage();

  await products.openCart();
  await cart.verifyCart();

  await cart.clickCheckout();
  await checkout.verifyCheckoutPage();

  await checkout.enterShippingDetails(
    "Alex Johnson",
    "100 Market St",
    "San Francisco",
    "94105",
  );

  await checkout.verifyOrderSummary();

  await dashboard.clickSettings();
  await settings.verifySettings();
});
