1. **Create NFT Form UI**:
   - Navigate to the "Create NFT" page.
   - Verify that the "Create NFT" heading is displayed.
   - Verify that the form fields for "NFT Title", "NFT Category", "NFT Collection", "NFT Price (in ETH)", "NFT Image URL", and "NFT Summary" are displayed.
   - Verify that the "Create NFT" button is displayed.

2. **Create NFT Form Submitted with Invalid Credentials**:
   - Navigate to the "Create NFT" page.
   - Attempt to submit the form without filling in any fields and verify that appropriate validation messages are displayed for each field.
   - Fill in the "NFT Title" field with spaces and verify that the validation message "Title should contain characters or digits!" is displayed.
   - Fill in the "NFT Title" field with a short text and verify that the validation message "Title should be at least 3 characters long!" is displayed.
   - Correct the "NFT Title" field with a valid title.
   - Attempt to submit the form and verify that the validation message "Category is missing!" is displayed.
   - Fill in the "NFT Category" field with spaces and verify that the validation message "Category should contain characters or digits!" is displayed.
   - Fill in the "NFT Category" field with a short text and verify that the validation message "Category should be at least 3 characters long!" is displayed.
   - Correct the "NFT Category" field with a valid category.
   - Attempt to submit the form and verify that the validation message "Collection is missing!" is displayed.
   - Fill in the "NFT Collection" field with spaces and verify that the validation message "Collection should contain characters or digits!" is displayed.
   - Fill in the "NFT Collection" field with a short text and verify that the validation message "Collection should be at least 3 characters long!" is displayed.
   - Correct the "NFT Collection" field with a valid collection name.
   - Attempt to submit the form and verify that the validation message "Price is missing!" is displayed.
   - Fill in the "NFT Price" field with a valid price.
   - Attempt to submit the form and verify that the validation message "Image URL is missing!" is displayed.
   - Fill in the "NFT Image URL" field with spaces and verify that the validation message "Image URL must be in valid format!" is displayed.
   - Correct the "NFT Image URL" field with a valid URL.
   - Attempt to submit the form and verify that the validation message "Summary is missing!" is displayed.
   - Fill in the "NFT Summary" field with spaces and verify that the validation message "Summary should contain characters or digits!" is displayed.
   - Fill in the "NFT Summary" field with a short text and verify that the validation message "Summary should be at least 10 characters long!" is displayed.
   - Correct the "NFT Summary" field with a valid summary.
   - Attempt to submit the form with a duplicate NFT title and verify that the validation message "NFT with this title already exists!" is displayed.
   - Verify that no new NFT is created by checking the total number of NFTs and ensuring the duplicate title is not added.

3. **Create NFT Form Submitted with Valid Credentials**:
   - Navigate to the "Create NFT" page.
   - Fill in the form fields with valid data for "NFT Title", "NFT Category", "NFT Collection", "NFT Price", "NFT Image URL", and "NFT Summary".
   - Submit the form.
   - Verify that a success message is displayed indicating the NFT was created.
   - Navigate to the "All NFTs" page.
   - Search for the newly created NFT by title and verify that it appears in the list with the correct details.
   - Verify that the new NFT is created by checking the total number of NFTs and ensuring the new title is present.