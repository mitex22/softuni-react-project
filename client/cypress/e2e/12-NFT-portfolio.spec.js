/// <reference types="cypress" />

describe("NFT Portfolio Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("My Portfolio - UI when empty", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('admin@abv.bg', { delay: 100 });
        cy.get('form input[type="password"]').type('admin', { delay: 100 });
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('My Portfolio').click();

        cy.get('h1').contains('My NFT Collection').should('exist');
        cy.get('p').contains('No NFTs in your collection').should('exist');

        cy.get('nav').contains('Log Out').click();
    });

    it("My Portfolio - UI when not empty", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', { delay: 100 });
        cy.get('form input[type="password"]').type('123456', { delay: 100 });
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('My Portfolio').click();

        cy.get('h1').contains('My NFT Collection').should('exist');

        cy.get("#my-portfolio")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 2)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });

        cy.get('nav').contains('Log Out').click();
    });

    it("Other Portfolios UI", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('admin@abv.bg', { delay: 100 });
        cy.get('form input[type="password"]').type('admin', { delay: 100 });
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('Other Portfolio').click();

        cy.get('h1').contains('Users Portfolios').should('exist');
        cy.get('p').contains('Take a look at what other users own').should('exist');

        cy.get(".user-list-grid")
            .find(".user-list-item-card")
            .should("have.length", 2)
            .each(($el) => {
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find('a').contains("Browse Portfolio").should("exist");
            });
        
        cy.get('h5').contains('Peter\'s Portfolio').siblings('a').click();
        cy.get('h1').contains('Peter\'s Collection').should("exist");
        cy.url().should('include', '/Peter');

        cy.get("#other-user-portfolio")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .should("have.length", 2)
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });

        cy.get('nav').contains('Log Out').click();
    });
});
