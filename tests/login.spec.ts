import { test } from "@playwright/test";
import LoginPage from "../POMs/loginPage";

test.use({ storageState: { cookies: [], origins: [] } });

let loginPage: LoginPage;

test.beforeEach(async ({ page }) => {
  // 1) Otvori home preko baseURL-a
  await page.goto("/");

  // 2) Napravi POM instance
  loginPage = new LoginPage(page);

  // 3) Odi na login stranicu (My Account -> Login)
  await loginPage.openLoginPage();

  // 4) Provjeri da smo na loginu (AUTO-RETRY assertion)
  await loginPage.assertLoginPageIsOpened();
});

test("Successful login (valid email & password)", async ({ page }) => {
  // given (već smo na login page zbog beforeEach)

  // when
  await loginPage.login(
    process.env.CORRECT_EMAIL || "",
    process.env.CORRECT_PASSWORD || ""
  );

  // then
  // Najjednostavnije: provjeri URL da smo na My Account (token se mijenja pa koristimo regex)
  await page.waitForURL(/route=account\/account/);
});

test("Login without entering email and password", async () => {
  // given (već smo na login page)

  // when
  await loginPage.loginWithoutCredentials();

  // then
  await loginPage.assertWarningIsShown();
});

test("Login with valid email and wrong password", async () => {
  // given (već smo na login page)

  // when
  await loginPage.login(process.env.CORRECT_EMAIL || "", process.env.WRONG_PASSWORD || "");

  // then
  await loginPage.assertWarningIsShown();
});
