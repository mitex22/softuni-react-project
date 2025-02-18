1. **Login Form UI:**
   - Navigate to the Login page.
   - Verify the presence of the "Sign in to your account" heading.
   - Verify the presence of the email input field with the placeholder "name@company.com".
   - Verify the presence of the password input field with the placeholder "••••••••".
   - Verify the presence of the Log In button.
   - Verify the presence of the "Don't have an account yet?" text and the "Register" link.

2. **Login Form Submitted with Valid Credentials:**
   - Navigate to the Login page.
   - Fill in the email field with "peter@abv.bg".
   - Fill in the password field with "123456".
   - Click the Log In button.
   - Verify the presence of the "Welcome, Peter" text in the navigation bar.
   - Verify that the local storage contains the email "peter@abv.bg".
   - Click the Log Out button.

3. **Login Form Submitted with Invalid Credentials:**
   - Navigate to the Login page.
   - Fill in the email field with "wrong@email.com".
   - Fill in the password field with "wrongpassword".
   - Click the Log In button.
   - Verify the presence of the error message "Email or password don't match".
   - Verify the absence of the "Welcome, Peter" text in the navigation bar.
   - Verify that the local storage does not contain any authentication data.

4. **Login Form Register Button:**
   - Navigate to the Login page.
   - Click the Register link.
   - Verify the presence of the "Create an account" heading.