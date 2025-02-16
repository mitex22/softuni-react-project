/// <reference types="cypress" />

describe("Landing Page Tests Suite", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
    });

    it("hero section should contain corret text and cta btn", () => {
        cy.get("#hero").contains("Unlock Unique Digital Assets with NFT Cards");
        cy.get("#hero").contains(
            "Explore, collect, and trade one-of-a-kind digital cards, each with its own rarity and value. Start building your portfolio today and own a piece of the digital revolution."
        );
        cy.get("#hero")
            .contains("Get started")
            .should("have.attr", "href", "/nfts");
    });

    it("latest nfts section should contain correct heading and 3 nft cards", () => {
        cy.get("#latest-nfts").contains("Latest NFTs");

        cy.get("#latest-nfts")
            .find(".max-w-sm", ".rounded", ".overflow-hidden", ".shadow-lg")
            .each(($el) => {
                cy.wrap($el).find("img").should("exist");
                cy.wrap($el).find("h5").should("exist");
                cy.wrap($el).find("h6").should("exist");
                cy.wrap($el).contains("Details").should("exist");
            });
    });
});
