Sure, here are the plain text descriptions for the test scenarios in the provided test script:

1. **Edit NFT Form UI**:
   - Log in with valid credentials.
   - Navigate to the "All NFTs" page.
   - Search for an NFT by typing "Kondyo" in the search input.
   - Click on the "Details" button for the NFT.
   - Click on the "Edit NFT" button.
   - Verify that the "Edit NFT" heading is displayed.
   - Verify that the form fields for "NFT Title", "NFT Category", "NFT Collection", "NFT Price (in ETH)", "NFT Image URL", and "NFT Summary" are displayed with the current values of the NFT.
   - Verify that the "Edit NFT" button is displayed.

2. **Edit NFT Form Submitted with Invalid Credentials**:
   - Log in with valid credentials.
   - Navigate to the "All NFTs" page.
   - Search for an NFT by typing "Kondyo" in the search input.
   - Click on the "Details" button for the NFT.
   - Click on the "Edit NFT" button.
   - Clear the "NFT Title" field and attempt to submit the form. Verify that the validation message "Title is missing!" is displayed.
   - Fill the "NFT Title" field with spaces and attempt to submit the form. Verify that the validation message "Title should contain characters or digits!" is displayed.
   - Fill the "NFT Title" field with a short text and attempt to submit the form. Verify that the validation message "Title should be at least 3 characters long!" is displayed.
   - Correct the "NFT Title" field with a valid title.
   - Clear the "NFT Category" field and attempt to submit the form. Verify that the validation message "Category is missing!" is displayed.
   - Fill the "NFT Category" field with spaces and attempt to submit the form. Verify that the validation message "Category should contain characters or digits!" is displayed.
   - Fill the "NFT Category" field with a short text and attempt to submit the form. Verify that the validation message "Category should be at least 3 characters long!" is displayed.
   - Correct the "NFT Category" field with a valid category.
   - Clear the "NFT Collection" field and attempt to submit the form. Verify that the validation message "Collection is missing!" is displayed.
   - Fill the "NFT Collection" field with spaces and attempt to submit the form. Verify that the validation message "Collection should contain characters or digits!" is displayed.
   - Fill the "NFT Collection" field with a short text and attempt to submit the form. Verify that the validation message "Collection should be at least 3 characters long!" is displayed.
   - Correct the "NFT Collection" field with a valid collection name.
   - Clear the "NFT Price" field and attempt to submit the form. Verify that the validation message "Price is missing!" is displayed.
   - Correct the "NFT Price" field with a valid price.
   - Clear the "NFT Image URL" field and attempt to submit the form. Verify that the validation message "Image URL is missing!" is displayed.
   - Fill the "NFT Image URL" field with spaces and attempt to submit the form. Verify that the validation message "Image URL must be in valid format!" is displayed.
   - Correct the "NFT Image URL" field with a valid URL.
   - Clear the "NFT Summary" field and attempt to submit the form. Verify that the validation message "Summary is missing!" is displayed.
   - Fill the "NFT Summary" field with spaces and attempt to submit the form. Verify that the validation message "Summary should contain characters or digits!" is displayed.
   - Fill the "NFT Summary" field with a short text and attempt to submit the form. Verify that the validation message "Summary should be at least 10 characters long!" is displayed.
   - Correct the "NFT Summary" field with a valid summary.
   - Submit the form and verify that a success message is displayed indicating the NFT was edited.
   - Verify that the total number of NFTs remains the same by checking the total number of NFTs.