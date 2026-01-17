## Automated Test Cases (Playwright)

1. **Successful login with valid credentials**
   - **Preconditions:** User account exists (credentials are stored in `.env`: `CORRECT_EMAIL`, `CORRECT_PASSWORD`)
   - **Steps:**
     1. Open home page `https://demo.opencart-extensions.co.uk/`.
     2. Navigate to Login page by clicking **My Account → Login**.
     3. Enter valid email (aa@aa.aa) and password (aaaa).
     4. Click **Login**.
   - **Expected result:**
     - URL contains `route=account/account`.
     - "My Account" page is visible (e.g., heading "My Account" is shown).

2. **Login attempt with empty email and password**
   - **Steps:**
     1. Open home page `https://demo.opencart-extensions.co.uk/`.
     2. Navigate to Login page by clicking **My Account → Login**.
     3. Click **Login** without entering email/password.
   - **Expected result:**
     - Warning message is visible (contains "Warning").
     - User stays on Login page (URL contains `route=account/login`).

3. **Login attempt with valid email and invalid password**
   - **Test data:** email from `.env` (`CORRECT_EMAIL`), invalid password from `.env` (`WRONG_PASSWORD`)
   - **Steps:**
     1. Open home page `https://demo.opencart-extensions.co.uk/`.
     2. Navigate to Login page by clicking **My Account → Login**.
     3. Enter valid email (aa@aa.aa) and invalid password (1234).
     4. Click **Login**.
   - **Expected result:**
     - Warning message is visible (contains "Warning").
     - User stays on Login page (URL contains `route=account/login`).

4. **Clicking the OpenCart logo returns to Home after login**
   - **Preconditions:** User is logged in.
   - **Steps:**
     1. Open home page `https://demo.opencart-extensions.co.uk/`.
     2. Navigate to Login page by clicking **My Account → Login**.
     3. Enter valid email (aa@aa.aa) and password (aaaa).
     4. Click the store logo in the header.
   - **Expected result:**
     - User is redirected to the Home page (root URL / BASE_URL).
     - Home page main content is visible (e.g., "Featured" section).

5. **Edit Account Information navigation from My Account**
   - **Preconditions:** User is logged in.
   - **Steps:**
     1. Open home page `https://demo.opencart-extensions.co.uk/`.
     2. Navigate to Login page by clicking **My Account → Login**.
     3. Enter valid email (aa@aa.aa) and password (aaaa).
     4. User is in "My Account" page.
     5. In "My account" page click **Edit your account information**.
   - **Expected result:**
     - URL contains `route=account/edit`.
     - Page heading "My Account Information" is visible.
