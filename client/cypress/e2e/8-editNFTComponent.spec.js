/// <reference types="cypress" />

describe("Edit NFT Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', { delay: 100 });
        cy.get('form input[type="password"]').type('123456', { delay: 100 });
        cy.get('button').contains('Log In').click();
    });

    afterEach(() => {
        cy.get('nav').contains('Log Out').click();
    });

    it("edit nft form UI", () => {
        cy.get('nav').contains('All NFTs').click();

        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });

        cy.get('a').contains('Details').click();
        cy.get('a').contains('Edit NFT').click();

        cy.get('h1').contains('Edit NFT').should('exist');

        cy.get('form label[for="title"]').contains('NFT Title').should('exist');
        cy.get('form input[placeholder="Enter NFT title..."]').should('have.value', 'Kondyo');

        cy.get('form label[for="category"]').contains('NFT Category').should('exist');
        cy.get('form input[placeholder="Enter NFT category..."]').should('have.value', 'Music');

        cy.get('form label[for="collectionName"]').contains('NFT Collection').should('exist');
        cy.get('form input[placeholder="Enter NFT collection..."]').should('have.value', 'Seedworld Vanguards');

        cy.get('form label[for="price"]').contains('NFT Price (in ETH)').should('exist');
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').should('have.value', '4');

        cy.get('form label[for="imageUrl"]').contains('NFT Image URL').should('exist');
        cy.get('form input[placeholder="Enter NFT image url address..."]').should('have.value', 'https://i.seadn.io/s/raw/files/384f8c8d5f709a2bc2ced2aa67d33179.webp?auto=format&dpr=1&w=750');

        cy.get('form label[for="summary"]').contains('NFT Summary').should('exist');
        cy.get('form textarea[name="summary"]').should('have.value', 'Seedworld Vanguards is the PFP collection of Seedworld, a UGC gaming platform with a Real World Economy. Expect an art upgrade called Rebirth, and races like Orcs, Goblins, Elves, Dwarves, and Immortals to join the story soon.');

        cy.get('form button').contains('Edit NFT').should('exist');
    });

    it("edit nft form validations and submit", () => {
        cy.get('nav').contains('All NFTs').click();

        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });

        cy.get('a').contains('Details').click();
        cy.get('a').contains('Edit NFT').click();

        // title
        cy.get('form input[placeholder="Enter NFT title..."]').should('have.attr', 'readonly');

        // category
        cy.get('form input[placeholder="Enter NFT category..."]').clear();
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').contains('Category is missing!').should('exist');

        cy.get('form input[placeholder="Enter NFT category..."]').should('be.enabled');
        cy.get('form input[placeholder="Enter NFT category..."]').type('   ', { delay: 100 });
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').contains('Category should contain characters or digits!').should('exist');

        cy.get('form input[placeholder="Enter NFT category..."]').clear().type('Ca', { delay: 100 });
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').contains('Category should be at least 3 characters long!').should('exist');

        cy.get('form input[placeholder="Enter NFT category..."]').clear().type('Category', { delay: 100 });
        cy.get('form input[placeholder="Enter NFT category..."]').parent().siblings('span').should('not.exist');

        // collectionName
        cy.get('form input[placeholder="Enter NFT collection..."]').clear();
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').contains('Collection is missing!').should('exist');

        cy.get('form input[placeholder="Enter NFT collection..."]').should('be.enabled');
        cy.get('form input[placeholder="Enter NFT collection..."]').type('   ', { delay: 100 });
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').contains('Collection should contain characters or digits!').should('exist');

        cy.get('form input[placeholder="Enter NFT collection..."]').clear().type('Co', { delay: 100 });
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').contains('Collection should be at least 3 characters long!').should('exist');

        cy.get('form input[placeholder="Enter NFT collection..."]').clear().type('Collection', { delay: 100 });
        cy.get('form input[placeholder="Enter NFT collection..."]').parent().siblings('span').should('not.exist');

        // price
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').clear();
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').parent().siblings('span').contains('Price is missing!').should('exist');

        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').clear().type('123', { delay: 100 });
        cy.get('form input[placeholder="Enter NFT price (e.g. 3)..."]').parent().siblings('span').should('not.exist');

        // imageUrl
        cy.get('form input[placeholder="Enter NFT image url address..."]').clear();
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT image url address..."]').parent().siblings('span').contains('Image URL is missing!').should('exist');

        cy.get('form input[placeholder="Enter NFT image url address..."]').should('be.enabled');
        cy.get('form input[placeholder="Enter NFT image url address..."]').type('   ', { delay: 100 });
        cy.get('form input[placeholder="Enter NFT image url address..."]').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form input[placeholder="Enter NFT image url address..."]').parent().siblings('span').contains('Image URL must be in valid format!').should('exist');

        cy.get('form input[placeholder="Enter NFT image url address..."]').clear().type('https://i.seadn.io/s/raw/files/bd4df9a94fbb5709e5eb1b5d42949985.png?auto=format&dpr=1&w=750', { delay: 20 });
        cy.get('form input[placeholder="Enter NFT image url address..."]').parent().siblings('span').should('not.exist');

        // summary
        cy.get('form textarea').clear();
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form textarea').parent().siblings('span').contains('Summary is missing!').should('exist');

        cy.get('form textarea').type('   ', { delay: 100 });
        cy.get('form textarea').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form textarea').parent().siblings('span').contains('Summary should contain characters or digits!').should('exist');

        cy.get('form textarea').clear().type('Summary12', { delay: 100 });
        cy.get('form textarea').parent().siblings('span').should('not.exist');
        cy.get('form button').contains('Edit NFT').click();
        cy.get('form textarea').parent().siblings('span').contains('Summary should be at least 10 characters long!').should('exist');

        cy.get('form textarea').clear().type('Summary123', { delay: 100 });
        cy.get('form textarea').parent().siblings('span').should('not.exist');

        cy.get('form button').contains('Edit NFT').click();
        cy.get('div').contains('Successfully edited Kondyo!').should('exist');

        // check NFT count remians the same
        cy.request('GET', 'http://localhost:3030/data/nfts').then((response) => {
            expect(response.body).to.have.length(12);
        });
    });
});
