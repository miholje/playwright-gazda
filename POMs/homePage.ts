import { expect, Locator, Page } from "@playwright/test";

export class HomePage {
  readonly page: Page;

  // OpenCart logo (header)
  logoLink: Locator;

  // Element koji potvrđuje da smo na Home stranici
  featuredTitle: Locator;

  constructor(page: Page) {
    this.page = page;

    // Logo u headeru (vodi na home)
    this.logoLink = page.getByRole("link", { name: /Demo Store|Your Store/i });

    // "Featured" naslov postoji samo na home pageu
    this.featuredTitle = page.getByRole("heading", { name: "Featured" });
  }

  // === AKCIJE ===

  async clickLogo() {
    await this.logoLink.click();
  }

  // === ASSERTIONS ===

  async assertHomePageIsOpened() {
    await expect(this.page).toHaveURL(/(\/$|route=common\/home)/);
    await expect(this.featuredTitle).toBeVisible();
  }
}

export default HomePage;
