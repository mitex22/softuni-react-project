/// <reference types="cypress" />

describe("NFT Details Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("nft details UI - not auth", () => {
        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('main div img[alt="Kondyo\'s pic"]').should('exist');
        cy.get('main div').eq(1).within(() => {
            cy.get('h1').contains('Kondyo').should('exist');
            cy.get('h3').contains('Price: 4 ETH').should('exist');
            cy.get('p').contains('Current price: ').should('exist');
            cy.get('p').contains('(live rate from cryptocompare.com)').should('exist');
        });

        cy.get('main div').eq(2).within(() => {
            cy.get('h3').contains('NFT Description').should('exist');
            cy.get('p').contains('Seedworld Vanguards is the PFP collection of Seedworld, a UGC gaming platform with a Real World Economy. Expect an art upgrade called Rebirth, and races like Orcs, Goblins, Elves, Dwarves, and Immortals to join the story soon.').should('exist');
        });

        cy.get('main div').eq(3).within(() => {
            cy.get('h2').contains('Comments').should('exist');
            cy.get('h3').contains('Peter').should('exist');
            cy.get('p').contains('Posted on: February 25, 2021').should('exist');
            cy.get('p').contains('Kondyo is the best!').should('exist');
        });

        cy.get('aside h3').contains('Collection Name:').should('exist');
        cy.get('aside h2').contains('Seedworld Vanguards').should('exist');
        cy.get('aside h3').contains('Creator Name:').should('exist');
        cy.get('aside p').contains('Peter').should('exist');
        cy.get('aside h3').contains('Creator Email:').should('exist');
        cy.get('aside p').contains('peter@abv.bg').should('exist');
        cy.get('aside h3').contains('Created On:').should('exist');
        cy.get('aside p').contains('February 2, 2025').should('exist');
    });

    it("nft details UI - auth and owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', {delay: 100});
        cy.get('form input[type="password"]').type('123456', {delay: 100});
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('main div img[alt="Kondyo\'s pic"]').should('exist');
        cy.get('main div').eq(1).within(() => {
            cy.get('h1').contains('Kondyo').should('exist');
            cy.get('h3').contains('Price: 4 ETH').should('exist');
            cy.get('p').contains('Current price: ').should('exist');
            cy.get('p').contains('(live rate from cryptocompare.com)').should('exist');
        });

        cy.get('main div').eq(2).within(() => {
            cy.get('h3').contains('NFT Description').should('exist');
            cy.get('p').contains('Seedworld Vanguards is the PFP collection of Seedworld, a UGC gaming platform with a Real World Economy. Expect an art upgrade called Rebirth, and races like Orcs, Goblins, Elves, Dwarves, and Immortals to join the story soon.').should('exist');
        });

        cy.get('main div').eq(3).within(() => {
            cy.get('h2').contains('Comments').should('exist');
            cy.get('h3').contains('Peter').should('exist');
            cy.get('p').contains('Posted on: February 25, 2021').should('exist');
            cy.get('p').contains('Kondyo is the best!').should('exist');
            cy.get('h6').contains('Liked by:').should('exist');
            cy.get('p').contains('1 person.').should('exist');
            cy.get('button').contains('Delete').should('exist');
        });

        cy.get('aside h3').contains('Collection Name:').should('exist');
        cy.get('aside h2').contains('Seedworld Vanguards').should('exist');
        cy.get('aside h3').contains('Creator Name:').should('exist');
        cy.get('aside p').contains('Peter').should('exist');
        cy.get('aside h3').contains('Creator Email:').should('exist');
        cy.get('aside p').contains('peter@abv.bg').should('exist');
        cy.get('aside h3').contains('Created On:').should('exist');
        cy.get('aside p').contains('February 2, 2025').should('exist');

        cy.get('nav').contains('Log Out').click();
    });

    it("nft details UI - auth but not owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('george@abv.bg', {delay: 100});
        cy.get('form input[type="password"]').type('123456', {delay: 100});
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('main div img[alt="Kondyo\'s pic"]').should('exist');
        cy.get('main div').eq(1).within(() => {
            cy.get('h1').contains('Kondyo').should('exist');
            cy.get('h3').contains('Price: 4 ETH').should('exist');
            cy.get('p').contains('Current price: ').should('exist');
            cy.get('p').contains('(live rate from cryptocompare.com)').should('exist');
        });

        cy.get('main div').eq(2).within(() => {
            cy.get('h3').contains('NFT Description').should('exist');
            cy.get('p').contains('Seedworld Vanguards is the PFP collection of Seedworld, a UGC gaming platform with a Real World Economy. Expect an art upgrade called Rebirth, and races like Orcs, Goblins, Elves, Dwarves, and Immortals to join the story soon.').should('exist');
        });

        cy.get('main div').eq(3).within(() => {
            cy.get('h2').contains('Comments').should('exist');
            cy.get('h3').contains('Peter').should('exist');
            cy.get('p').contains('Posted on: February 25, 2021').should('exist');
            cy.get('p').contains('Kondyo is the best!').should('exist');
            cy.get('h6').contains('Liked by:').should('exist');
            cy.get('p').contains('You').should('exist');
            cy.get('button[title*="Like"]').should('exist');
        });

        cy.get('aside h3').contains('Collection Name:').should('exist');
        cy.get('aside h2').contains('Seedworld Vanguards').should('exist');
        cy.get('aside h3').contains('Creator Name:').should('exist');
        cy.get('aside p').contains('Peter').should('exist');
        cy.get('aside h3').contains('Creator Email:').should('exist');
        cy.get('aside p').contains('peter@abv.bg').should('exist');
        cy.get('aside h3').contains('Created On:').should('exist');
        cy.get('aside p').contains('February 2, 2025').should('exist');

        cy.get('nav').contains('Log Out').click();
    });
});
