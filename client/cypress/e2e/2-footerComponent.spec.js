/// <reference types="cypress" />

describe("Footer Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit("http://localhost:5173");
    });

    it("footer contains 4 links", () => {
        cy.get("footer").find("a").should("have.length", 4);

        cy.get("footer")
            .find("a")
            .eq(0)
            .should("have.attr", "href", "/")
            .find("img")
            .should("have.attr", "src", "/src/assets/images/nft-logo.png");
        cy.get("footer")
            .find("a")
            .eq(1)
            .should("have.attr", "href", "#")
            .find("img")
            .should("have.attr", "src", "/src/assets/images/twitter.png");
        cy.get("footer")
            .find("a")
            .eq(2)
            .should("have.attr", "href", "#")
            .find("img")
            .should("have.attr", "src", "/src/assets/images/instagram.png");
        cy.get("footer")
            .find("a")
            .eq(3)
            .should("have.attr", "href", "#")
            .find("img")
            .should("have.attr", "src", "/src/assets/images/facebook.png");
    });

    it("footer should contain corret text", () => {
        cy.get("footer").contains(
            "by Dimitar Pavlov | 2025 | © All rights reserved."
        );
    });
});
