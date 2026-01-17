import { test } from "@playwright/test";
import LoginPage from "../POMs/loginPage";
import HomePage from "../POMs/homePage";
import AccountPage from "../POMs/accountPage";

test.use({ storageState: { cookies: [], origins: [] } });

let loginPage: LoginPage;
let homePage: HomePage;
let accountPage: AccountPage;

test.beforeEach(async ({ page }) => {
  // 1) Otvori home
  await page.goto("/");

  // 2) POM instance
  loginPage = new LoginPage(page);
  homePage = new HomePage(page);
  accountPage = new AccountPage(page);

  // 3) Login (preduvjet za oba testa u ovom fileu)
  await loginPage.openLoginPage();
  await loginPage.assertLoginPageIsOpened();
  await loginPage.login(
    process.env.CORRECT_EMAIL || "",
    process.env.CORRECT_PASSWORD || ""
  );

  // 4) Provjeri da smo stvarno na My Account
  await accountPage.assertMyAccountPageIsOpened();
});

test("Clicking OpenCart logo returns to Home after login", async () => {
  // given: user logged in, on My Account

  // when
  await homePage.clickLogo();

  // then
  await homePage.assertHomePageIsOpened();
});

test('Click "Edit your account information" opens My Account Information', async () => {
  // given: user logged in, on My Account

  // when
  await accountPage.openEditAccountInformation();

  // then
  await accountPage.assertAccountInformationPageIsOpened();
});
