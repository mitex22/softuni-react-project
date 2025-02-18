1. **Register Form UI:**
   - Navigate to the Register page.
   - Verify the presence of the "Create an account" heading.
   - Verify the presence of the email input field with the placeholder "name@company.com".
   - Verify the presence of the username input field with the placeholder "jorko0o0o".
   - Verify the presence of the password input field with the placeholder "••••••••".
   - Verify the presence of the confirm password input field with the placeholder "••••••••".
   - Verify the presence of the Register button.
   - Verify the presence of the "Already registered?" text and the "Log In" link.

2. **Register Form Submitted with Valid Credentials:**
   - Navigate to the Register page.
   - Fill in the email field with "manol@abv.bg".
   - Fill in the username field with "Manol".
   - Fill in the password field with "123123".
   - Fill in the confirm password field with "123123".
   - Click the Register button.
   - Verify the presence of the "Welcome, Manol" text in the navigation bar.
   - Verify that the local storage contains the email "manol@abv.bg".
   - Click the Log Out button.

3. **Register Form Submitted with Valid Credentials but User Already Exists:**
   - Navigate to the Register page.
   - Fill in the email field with "manol@abv.bg".
   - Fill in the username field with "Manol".
   - Fill in the password field with "123123".
   - Fill in the confirm password field with "123123".
   - Click the Register button.
   - Verify the presence of the error message "A user with the same email already exists!".
   - Verify the absence of the "Welcome, Peter" text in the navigation bar.
   - Verify that the local storage does not contain any authentication data.

4. **Register Form Submitted with Invalid Credentials:**
   - Navigate to the Register page.
   - Fill in the email field with "stamat@abv.bg".
   - Fill in the username field with "St".
   - Click the Register button.
   - Verify the absence of the "Welcome, St" text in the navigation bar.
   - Verify the presence of the error message "Username must be at least 3 characters!".
   - Clear the username field and fill it with "Stamat".
   - Verify the absence of the error message for the username field.
   - Fill in the password field with "12312".
   - Click the Register button.
   - Verify the absence of the "Welcome, Stamat" text in the navigation bar.
   - Verify the presence of the error message "Password must be at least 6 characters!".
   - Clear the password field and fill it with "123123".
   - Verify the absence of the error message for the password field.
   - Fill in the confirm password field with "12312".
   - Click the Register button.
   - Verify the absence of the "Welcome, Stamat" text in the navigation bar.
   - Verify the presence of the error message "Password and Confirm Password must match!".
   - Clear the confirm password field and fill it with "123123".
   - Verify the absence of the error message for the confirm password field.
   - Verify that the local storage does not contain any authentication data.

5. **Register Form Log In Button:**
   - Navigate to the Register page.
   - Click the Log In link.
   - Verify the presence of the "Sign in to your account" heading.