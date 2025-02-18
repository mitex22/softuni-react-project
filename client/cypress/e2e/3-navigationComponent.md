1. **Navbar contains 4 links only when NOT authenticated:**
   - Navigate to the homepage.
   - Verify that the navigation bar contains 4 links.
   - Verify that the first link has the href attribute "/" and contains an image with the src attribute "/src/assets/images/nft-logo.png".
   - Verify that the second link has the href attribute "/nfts" and contains the text "All NFTs".
   - Verify that the third link has the href attribute "/login" and contains the text "Login".
   - Verify that the fourth link has the href attribute "/register" and contains the text "Register".

2. **Navbar contains 6 links when authenticated:**
   - Log in with the email "peter@abv.bg" and the password "123456".
   - Verify that the navigation bar contains 6 links.
   - Verify that the first link has the href attribute "/" and contains an image with the src attribute "/src/assets/images/nft-logo.png".
   - Verify that the second link has the href attribute "/nfts" and contains the text "All NFTs".
   - Verify that the third link has the href attribute "/nft/create" and contains the text "Create NFT".
   - Verify that the fourth link has the href attribute "/nft/portfolio" and contains the text "My Portfolio".
   - Verify that the fifth link has the href attribute "/users" and contains the text "Other Portfolios".
   - Verify that the sixth link has the href attribute "/logout" and contains the text "Log Out".
   - Verify the presence of the text "Welcome, Peter" in the navigation bar.
   - Log out.