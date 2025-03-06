/// <reference types="cypress" />

describe("Create NFT Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', {delay: 100});
        cy.get('form input[type="password"]').type('123456', {delay: 100});
        cy.get('button').contains('Log In').click();
    });

    afterEach(() => {
        cy.get('nav').contains('Log Out').click();
    });

    it("create nft form UI", () => {
        cy.get('nav').contains('Create NFT').click();

        cy.get('h1').contains('Create NFT').should('exist');

        cy.get('form label[for="title"]').contains('NFT Title').should('exist');
        cy.get('form input[placeholder="Enter NFT title..."]').should('exist');

        cy.get('form label[for="category"]').contains('NFT Category').should('exist');
        cy.get('form input[placeholder="Enter NFT category..."]').should('exist');

        cy.get('form label[for="collectionName"]').contains('NFT Collection').should('exist');
        cy.get('form input[placeholder="Enter NFT collection..."]').should('exist');

        cy.get('form label[for="price"]').contains('NFT Price (in ETH)').should('exist');
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').should('exist');
        
        cy.get('form label[for="imageUrl"]').contains('NFT Image URL').should('exist');
        cy.get('form input[placeholder="Enter NFT image url address..."]').should('exist');
        
        cy.get('form label[for="summary"]').contains('NFT Summary').should('exist');
        cy.get('form textarea[name="summary"]').should('exist');

        cy.get('form button').contains('Create NFT').should('exist');

        
    });

    it("create nft form submitted with invalid credentials", () => {
        cy.get('nav').contains('Create NFT').click();

        // title
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT title..."]').parent().siblings('span').contains('Title is missing!').should('exist');
    
        cy.get('form input[placeholder="Enter NFT title..."]').type('   ', {delay: 100});
        cy.get('form input[placeholder="Enter NFT title..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT title..."]').parent().siblings('span').contains('Title should contain characters or digits!').should('exist');

        cy.get('form input[placeholder="Enter NFT title..."]').clear().type('Ko', {delay: 100});
        cy.get('form input[placeholder="Enter NFT title..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT title..."]').parent().siblings('span').contains('Title should be at least 3 characters long!').should('exist');

        cy.get('form input[placeholder="Enter NFT title..."]').clear().type('Kondyo', {delay: 100});
        cy.get('form input[placeholder="Enter NFT title..."]').parent().siblings('span').should('not.exist');

        // category
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').contains('Category is missing!').should('exist');
    
        cy.get('form input[placeholder="Enter NFT category..."]').type('   ', {delay: 100});
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').contains('Category should contain characters or digits!').should('exist');

        cy.get('form input[placeholder="Enter NFT category..."]').clear().type('Ca', {delay: 100});
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').contains('Category should be at least 3 characters long!').should('exist');

        cy.get('form input[placeholder="Enter NFT category..."]').clear().type('Category', {delay: 100});
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').should('not.exist');

        // collectionName
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').contains('Collection is missing!').should('exist');
    
        cy.get('form input[placeholder="Enter NFT collection..."]').type('   ', {delay: 100});
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').contains('Collection should contain characters or digits!').should('exist');

        cy.get('form input[placeholder="Enter NFT collection..."]').clear().type('Co', {delay: 100});
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').contains('Collection should be at least 3 characters long!').should('exist');

        cy.get('form input[placeholder="Enter NFT collection..."]').clear().type('Collection', {delay: 100});
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').should('not.exist');

        // price
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').parent().siblings('span').contains('Price is missing!').should('exist');
    
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').clear().type('123', {delay: 100});
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').parent().siblings('span').should('not.exist');

        // imageUrl
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT image url address..."]').parent().siblings('span').contains('Image URL is missing!').should('exist');
    
        cy.get('form input[placeholder="Enter NFT image url address..."]').type('   ', {delay: 100});
        cy.get('form input[placeholder="Enter NFT image url address..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT image url address..."]').parent().siblings('span').contains('Image URL must be in valid format!').should('exist');

        cy.get('form input[placeholder="Enter NFT image url address..."]').clear().type('https://i.seadn.io/s/raw/files/bd4df9a94fbb5709e5eb1b5d42949985.png?auto=format&dpr=1&w=750', {delay: 20});
        cy.get('form input[placeholder="Enter NFT image url address..."]').parent().siblings('span').should('not.exist');

        // summary
        cy.get('form button').contains('Create NFT').click();
        cy.get('form textarea').parent().siblings('span').contains('Summary is missing!').should('exist');
    
        cy.get('form textarea').type('   ', {delay: 100});
        cy.get('form textarea').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form textarea').parent().siblings('span').contains('Summary should contain characters or digits!').should('exist');

        cy.get('form textarea').clear().type('Summary12', {delay: 100});
        cy.get('form textarea').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Create NFT').click();
        cy.get('form textarea').parent().siblings('span').contains('Summary should be at least 10 characters long!').should('exist');
        
        cy.get('form textarea').clear().type('Summary123', {delay: 100});
        cy.get('form textarea').parent().siblings('span').should('not.exist');
        
        cy.get('form button').contains('Create NFT').click();
        cy.get('form input[placeholder="Enter NFT title..."]').parent().siblings('span').contains('NFT with this title already exists!').should('exist');

        // check no NFT is created
        cy.request('GET', 'http://localhost:3030/data/nfts').then((response) => {
            expect(response.body).to.have.length(12);
            let isFound = false;
            response.body.forEach((nft) => {
                if (nft.title === 'Kondyo') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.true;
        });
        
    });

    it("create nft form submitted with valid credentials", () => {

        cy.get('nav').contains('Create NFT').click();

        cy.get('form input[placeholder="Enter NFT title..."]').type('Gonzo', {delay: 100});
        cy.get('form input[placeholder="Enter NFT category..."]').type('Category', {delay: 100});
        cy.get('form input[placeholder="Enter NFT collection..."]').type('Collection', {delay: 100});
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').type('123', {delay: 100});
        cy.get('form input[placeholder="Enter NFT image url address..."]').type('https://i.seadn.io/s/raw/files/6f46fcbdc5042a2c45d313ebce93ced3.webp?auto=format&dpr=1&w=384', {delay: 10});
        cy.get('form textarea').type('Summary123', {delay: 100});

        cy.get('form button').contains('Create NFT').click();

        // navigate to All NFTs page
        cy.get('div').contains('Successfully created NFT Gonzo').should('exist');

        cy.get('h1').contains('All NFTs').should('exist');
        cy.get('input[placeholder="Search by NFT title..."]').type('Gonzo', { delay: 100 });
        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 1)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("contain.text", "Gonzo");
                cy.wrap($el).find("h6").should("contain.text", "Category");
                cy.wrap($el).contains("Details").should("exist");
            });


        // check NFT is created
        cy.request('GET', 'http://localhost:3030/data/nfts').then((response) => {
            expect(response.body).to.have.length(13);
            let isFound = false;
            response.body.forEach((nft) => {
                if (nft.title === 'Gonzo') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.true;
        });
        
    });
});
