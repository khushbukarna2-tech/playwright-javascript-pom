import { test, expect } from "@playwright/test";

test("Verify Retail Website", async ({ page }) => {
  // Login
  await page.goto("https://retail-website-fawn.vercel.app/login");

  await expect(page).toHaveTitle("retailwebsite");
  await expect(page).toHaveURL(/fawn/);

  await page.getByRole("button", { name: "Sign in" }).click();

  // Dashboard
  await expect(page).toHaveURL(
    "https://retail-website-fawn.vercel.app/app/dashboard",
  );

  await expect(page.getByText("Revenue")).toBeVisible();
  await expect(page.getByText("Orders")).toBeVisible();
  await expect(page.getByText("Refunds")).toBeVisible();

  // Operations Widget
  await expect(page.getByText("Operations")).toBeVisible();
  await expect(page.getByText("shipments awaiting pickup")).toBeVisible();

  // Activity Widget
  await expect(page.getByText("Activity")).toBeVisible();
  await expect(page.getByText("Inventory sync completed")).toBeVisible();

  // Reorder Widgets Button
  await expect(
    page.getByRole("button", { name: "Reorder widgets" }),
  ).toBeVisible();

  // =========================
  // Products Page
  // =========================

  const products = page.getByRole("link", { name: "Products" });

  await products.click();

  await expect(page).toHaveURL(/products/);

  await expect(page.getByRole("heading", { name: "Products" })).toBeVisible();

  await expect(
    page.getByPlaceholder("Search products, categories…"),
  ).toBeVisible();

  const productCards = page.locator('button:has-text("Add to cart")');

  await expect(productCards.first()).toBeVisible();

  console.log("Total Products:", await productCards.count());

  // =========================
  // Cart Page
  // =========================

  const cart = page.getByRole("link", { name: "Cart" });

  await expect(cart).toBeVisible();
  await expect(cart).toBeEnabled();

  await cart.click();

  await expect(page).toHaveURL(/cart/);

  await expect(page.getByRole("heading", { name: "Your cart" })).toBeVisible();

  // =========================
  // Checkout Page
  // =========================

  const checkoutLink = page.getByRole("link", {
    name: "Checkout",
  });

  await expect(checkoutLink).toBeVisible();

  await checkoutLink.click();

  await expect(page).toHaveURL(/checkout/);

  await expect(page.getByRole("heading", { name: "Checkout" })).toBeVisible();

  // Shipping Details

  await page.getByLabel("Full name").fill("Alex Johnson");
  await page.getByLabel("Address").fill("100 Market St");
  await page.getByLabel("City").fill("San Francisco");
  await page.getByLabel("Postal").fill("94105");

  // Order Summary

  await expect(page.getByText("Order summary")).toBeVisible();
  await expect(page.getByText("Subtotal")).toBeVisible();
  await expect(page.getByText("Shipping").first()).toBeVisible();
  await expect(page.getByText("Tax")).toBeVisible();
  await expect(page.getByText("Total", { exact: true })).toBeVisible();

  // Pay Button

  const payButton = page.getByRole("button", {
    name: /Pay/i,
  });

  await expect(payButton).toBeVisible();

  // =========================
  // Settings Page
  // =========================

  const settings = page.getByRole("link", { name: "Settings" });

  await expect(settings).toBeVisible();

  await settings.click();

  await expect(page).toHaveURL(/settings/);

  // Sign Out Button

  await expect(page.getByRole("button", { name: "Sign out" })).toBeVisible();
});
