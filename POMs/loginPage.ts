import { expect, Locator, Page } from "@playwright/test";

export class LoginPage {
  readonly page: Page;

  // Header / navigacija
  myAccountMenu: Locator;
  loginLink: Locator;

  // Login forma
  emailField: Locator;
  passwordField: Locator;
  loginButton: Locator;

  // Warning poruka
  warningAlert: Locator;

  constructor(page: Page) {
    this.page = page;

    // My Account → Login
    this.myAccountMenu = page.locator('a[title="My Account"].dropdown-toggle');
    this.loginLink = page.getByRole("link", { name: "Login" });

    // Login form fields
    this.emailField = page.locator("#input-email");
    this.passwordField = page.locator("#input-password");
    this.loginButton = page.getByRole("button", { name: "Login" });

    // Alert za neuspješan login
    this.warningAlert = page.locator(".alert.alert-danger");
  }

  // === AKCIJE ===

  async openLoginPage() {
    await this.myAccountMenu.click();
    await this.loginLink.click();
  }

  async login(email: string, password: string) {
    await this.emailField.fill(email);
    await this.passwordField.fill(password);
    await this.loginButton.click();
  }

  async loginWithoutCredentials() {
    await this.loginButton.click();
  }

  // === ASSERTIONS ===

  async assertLoginPageIsOpened() {
    await expect(this.page).toHaveURL(/route=account\/login/);
    await expect(this.loginButton).toBeVisible();
  }

  async assertWarningIsShown() {
    await expect(this.warningAlert).toBeVisible();
    await expect(this.warningAlert).toContainText("Warning");
  }
}

export default LoginPage;
