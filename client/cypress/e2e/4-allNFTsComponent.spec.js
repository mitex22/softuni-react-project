/// <reference types="cypress" />

describe("All NFTs Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("All NFTs UI when NOT auth", () => {
        cy.get('nav').contains('All NFTs').click();
        cy.get('h1').contains('All NFTs').should('exist');
        cy.get('p').contains('Discover and Collect Exclusive NFTs').should('exist');
        cy.get('select').should('exist');
        cy.get('input[placeholder="Search by NFT title..."]').should('exist');

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 3)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });
    });

    it("All NFTs pagination when NOT auth", () => {
        cy.get('nav').contains('All NFTs').click();

        cy.get('span').contains('Page 1 of 3').should('exist');
        cy.get('#prev-btn').should('have.attr', 'disabled');
        cy.get('#next-btn').should('not.have.attr', 'disabled');

        cy.get('#next-btn').click();
        cy.get('#prev-btn').should('not.have.attr', 'disabled');

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 3)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });

        cy.get('#next-btn').click();
        cy.get('#prev-btn').should('not.have.attr', 'disabled');
        cy.get('#next-btn').should('have.attr', 'disabled');

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 1)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });
    });

    it("All NFTs filtering when NOT auth", () => {
        cy.get('nav').contains('All NFTs').click();

        cy.get('select').select('Music');

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 1)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("contain.text", "Kondyo");
                cy.wrap($el).find("h6").should("contain.text", "Music");
                cy.wrap($el).contains("Details").should("exist");
            });

        cy.get('span').contains('Page 1 of 1').should('exist');
        cy.get('#prev-btn').should('have.attr', 'disabled');
        cy.get('#next-btn').should('have.attr', 'disabled');

    });

    it("All NFTs search when NOT auth", () => {
        cy.get('nav').contains('All NFTs').click();

        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 1)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("contain.text", "Kondyo");
                cy.wrap($el).find("h6").should("contain.text", "Music");
                cy.wrap($el).contains("Details").should("exist");
            });

        cy.get('span').contains('Page 1 of 1').should('exist');
        cy.get('#prev-btn').should('have.attr', 'disabled');
        cy.get('#next-btn').should('have.attr', 'disabled');

        cy.get('nav').find('a[href="/"]').click();
        cy.get('nav').contains('All NFTs').click();

        cy.get('input[placeholder="Search by NFT title..."]').type('asdasd', { delay: 100 });

        cy.get("#all-nfts").should("not.exist");

        cy.get('p').contains('No NFTs match your search.').should('exist');

        cy.get('span').contains('Page 1 of 1').should('not.exist');
        cy.get('#prev-btn').should('not.exist');
        cy.get('#next-btn').should('not.exist');
    });

    // ------------------------------------------------------------------------------

    it("All NFTs UI when auth", () => {
        // login
        cy.get('nav').contains('Login').click();
        cy.get('input[type="email"]').type('peter@abv.bg');
        cy.get('input[type="password"]').type('123456');
        cy.get('form').submit();

        cy.get('nav').contains('All NFTs').click();
        cy.get('h1').contains('All NFTs').should('exist');
        cy.get('p').contains('Discover and Collect Exclusive NFTs').should('exist');
        cy.get('select').should('exist');
        cy.get('input[placeholder="Search by NFT title..."]').should('exist');

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 3)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });

        // logout
        cy.get('nav').contains('Log Out').click();
    });

    it("All NFTs pagination when auth", () => {
        // login
        cy.get('nav').contains('Login').click();
        cy.get('input[type="email"]').type('peter@abv.bg');
        cy.get('input[type="password"]').type('123456');
        cy.get('form').submit();

        cy.get('nav').contains('All NFTs').click();

        cy.get('span').contains('Page 1 of 3').should('exist');
        cy.get('#prev-btn').should('have.attr', 'disabled');
        cy.get('#next-btn').should('not.have.attr', 'disabled');

        cy.get('#next-btn').click();
        cy.get('#prev-btn').should('not.have.attr', 'disabled');

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 3)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });

        cy.get('#next-btn').click();
        cy.get('#prev-btn').should('not.have.attr', 'disabled');
        cy.get('#next-btn').should('have.attr', 'disabled');

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 1)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });

        // logout
        cy.get('nav').contains('Log Out').click();
    });

    it("All NFTs filtering when auth", () => {
        // login
        cy.get('nav').contains('Login').click();
        cy.get('input[type="email"]').type('peter@abv.bg');
        cy.get('input[type="password"]').type('123456');
        cy.get('form').submit();

        cy.get('nav').contains('All NFTs').click();

        cy.get('select').select('Music');

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 1)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("contain.text", "Kondyo");
                cy.wrap($el).find("h6").should("contain.text", "Music");
                cy.wrap($el).contains("Details").should("exist");
            });

        cy.get('span').contains('Page 1 of 1').should('exist');
        cy.get('#prev-btn').should('have.attr', 'disabled');
        cy.get('#next-btn').should('have.attr', 'disabled');

        // logout
        cy.get('nav').contains('Log Out').click();
    });

    it("All NFTs search when auth", () => {
        // login
        cy.get('nav').contains('Login').click();
        cy.get('input[type="email"]').type('peter@abv.bg');
        cy.get('input[type="password"]').type('123456');
        cy.get('form').submit();

        cy.get('nav').contains('All NFTs').click();

        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });

        cy.get("#all-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 1)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("contain.text", "Kondyo");
                cy.wrap($el).find("h6").should("contain.text", "Music");
                cy.wrap($el).contains("Details").should("exist");
            });

        cy.get('span').contains('Page 1 of 1').should('exist');
        cy.get('#prev-btn').should('have.attr', 'disabled');
        cy.get('#next-btn').should('have.attr', 'disabled');

        cy.get('nav').find('a[href="/"]').click();
        cy.get('nav').contains('All NFTs').click();

        cy.get('input[placeholder="Search by NFT title..."]').type('asdasd', { delay: 100 });

        cy.get("#all-nfts").should("not.exist");

        cy.get('p').contains('No NFTs match your search.').should('exist');

        cy.get('span').contains('Page 1 of 1').should('not.exist');
        cy.get('#prev-btn').should('not.exist');
        cy.get('#next-btn').should('not.exist');

        // logout
        cy.get('nav').contains('Log Out').click();
    });
});
