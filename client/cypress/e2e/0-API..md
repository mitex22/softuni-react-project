### Test Scenarios for API Responses:

#### **Login Tests**
1. **Successful Login (200)**
   - **Description**: Verify that a user can successfully log in with valid credentials.
   - **Steps**:
     1. Send a POST request to the `/users/login` endpoint with a valid email (`peter@abv.bg`) and password (`123456`).
     2. Verify that the response status code is `200`.

2. **Unsuccessful Login (403)**
   - **Description**: Verify that a user cannot log in with invalid credentials.
   - **Steps**:
     1. Send a POST request to the `/users/login` endpoint with a valid email (`peter@abv.bg`) but an incorrect password (`not-correct`).
     2. Verify that the response status code is `403`.

#### **Register Tests**
3. **Successful Registration (200)**
   - **Description**: Verify that a new user can successfully register with valid details.
   - **Steps**:
     1. Send a POST request to the `/users/register` endpoint with a unique email (`manol@abv.bg`), password (`123456`), and username (`manol`).
     2. Verify that the response status code is `200`.

4. **Unsuccessful Registration (409)**
   - **Description**: Verify that a user cannot register with an already existing email or username.
   - **Steps**:
     1. Send a POST request to the `/users/register` endpoint with an email (`manol@abv.bg`) and username (`manol`) that already exist in the system.
     2. Verify that the response status code is `409`.

#### **Latest NFTs Tests**
5. **Retrieve Latest NFTs**
   - **Description**: Verify that the `/data/nfts` endpoint returns the latest three NFTs.
   - **Steps**:
     1. Send a GET request to the `/data/nfts` endpoint with query parameters to sort by `_createdOn` in descending order and limit the results to 3.
     2. Verify that the response status code is `200`.
     3. Verify that the response body is an array.
     4. Verify that the array contains exactly 3 elements.

#### **All NFTs Tests**
6. **Retrieve All NFTs**
   - **Description**: Verify that the `/data/nfts` endpoint returns all NFTs.
   - **Steps**:
     1. Send a GET request to the `/data/nfts` endpoint.
     2. Verify that the response status code is `200`.
     3. Verify that the response body is an array.
     4. Verify that the array contains exactly 12 elements.
