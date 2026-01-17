import { expect, Locator, Page } from "@playwright/test";

export class AccountPage {
  readonly page: Page;

  // My Account stranica
  myAccountHeading: Locator;
  editAccountInfoLink: Locator;

  // Account Information stranica
  accountInfoHeading: Locator;

  constructor(page: Page) {
    this.page = page;

    // My Account heading (na route=account/account)
    this.myAccountHeading = page.locator("#content").getByRole("heading", { name: "My Account" });

    // Link koji vodi na edit account info
    this.editAccountInfoLink = page.getByRole("link", {
      name: "Edit your account information",
    });

    // Heading na route=account/edit
    this.accountInfoHeading = page.locator("#content").getByRole("heading", {
        name: "My Account Information"
    });

  }

  // === ASSERTIONS ===

  async assertMyAccountPageIsOpened() {
    await expect(this.page).toHaveURL(/route=account\/account/);
    await expect(this.myAccountHeading).toBeVisible();
  }

  // === AKCIJE ===

  async openEditAccountInformation() {
    await this.editAccountInfoLink.click();
  }

  // === ASSERTIONS ===

  async assertAccountInformationPageIsOpened() {
    await expect(this.page).toHaveURL(/route=account\/edit/);
    await expect(this.accountInfoHeading).toBeVisible();
  }
}

export default AccountPage;
