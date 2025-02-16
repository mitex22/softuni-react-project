/// <reference types="cypress" />

describe("Navigation Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
    });

    it("navbar contains 4 links only when NOT auth", () => {
        cy.get("nav").find("a").should("have.length", 4);

        cy.get("nav")
            .find("a")
            .eq(0)
            .should("have.attr", "href", "/")
            .find("img")
            .should("have.attr", "src", "/src/assets/images/nft-logo.png");
        cy.get("nav")
            .find("a")
            .eq(1)
            .should("have.attr", "href", "/nfts")
            .contains("All NFTs");
        cy.get("nav")
            .find("a")
            .eq(2)
            .should("have.attr", "href", "/login")
            .contains("Login");
        cy.get("nav")
            .find("a")
            .eq(3)
            .should("have.attr", "href", "/register")
            .contains("Register");
    });

    it("navbar contains 6 links when auth", () => {
        // login
        cy.get('nav').contains('Login').click();
        cy.get('input[type="email"]').type('peter@abv.bg');
        cy.get('input[type="password"]').type('123456');
        cy.get('form').submit();

        cy.get("nav").find("a").should("have.length", 6);

        cy.get("nav")
            .find("a")
            .eq(0)
            .should("have.attr", "href", "/")
            .find("img")
            .should("have.attr", "src", "/src/assets/images/nft-logo.png");
        cy.get("nav")
            .find("a")
            .eq(1)
            .should("have.attr", "href", "/nfts")
            .contains("All NFTs");
        cy.get("nav")
            .find("a")
            .eq(2)
            .should("have.attr", "href", "/nft/create")
            .contains("Create NFT");
        cy.get("nav")
            .find("a")
            .eq(3)
            .should("have.attr", "href", "/nft/portfolio")
            .contains("My Portfolio");
        cy.get("nav")
            .find("a")
            .eq(4)
            .should("have.attr", "href", "/users")
            .contains("Other Portfolios");
        cy.get("nav")
            .find("a")
            .eq(5)
            .should("have.attr", "href", "/logout")
            .contains("Log Out");
        cy.get("nav")
            .contains("Welcome, Peter");

        // logout
        cy.get('nav').contains('Log Out').click();
    });
});
