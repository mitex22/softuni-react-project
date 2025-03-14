/// <reference types="cypress" />

describe("NFT Actions Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("buy and sell nft - auth and owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', { delay: 100 });
        cy.get('form input[type="password"]').type('123456', { delay: 100 });
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('button').contains('Buy NFT').should('exist');

        cy.get('button').contains('Buy NFT').click();
        cy.get('div').contains('Successfully bought Kondyo for 4 ETH!').should('exist');

        // navigated to My Portfolio
        cy.get('h1').contains('My NFT Collection').should('exist');

        // check NFT bought successfully
        cy.request('GET', 'http://localhost:3030/data/portfolio').then((response) => {
            expect(response.body).to.have.length(4);
        });

        cy.get('h5').contains('Kondyo').parent().within(() => {
            cy.get('button').contains('Sell NFT').click();
        });

        cy.get('p').contains('Are you sure you want to sell Kondyo?').should('exist');

        // cancel delete
        cy.get('button').contains('Cancel').click();

        // check NFT sell cancelled
        cy.request('GET', 'http://localhost:3030/data/portfolio').then((response) => {
            expect(response.body).to.have.length(4);
        });

        cy.get('h5').contains('Kondyo').parent().within(() => {
            cy.get('button').contains('Sell NFT').click();
        });

        // cancel sell
        cy.get('button').contains('Cancel').click();

        // check NFT sell cancelled
        cy.request('GET', 'http://localhost:3030/data/portfolio').then((response) => {
            expect(response.body).to.have.length(4);
        });

        cy.get('h5').contains('Kondyo').parent().within(() => {
            cy.get('button').contains('Sell NFT').click();
        });

        // confirm sell
        cy.get('h3').contains('Sell NFT').parent().parent().parent().parent().within(() => {
            cy.get('button').contains('Sell').click();
        });

        cy.get('div').contains('Successfully sold Kondyo!').should('exist');

        // check NFT sell successful
        cy.request('GET', 'http://localhost:3030/data/portfolio').then((response) => {
            expect(response.body).to.have.length(3);
        });

        cy.get('h5').contains('Kondyo').should('not.exist');

        cy.get('nav').contains('Log Out').click();
    });

    it("delete nft - auth and owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', { delay: 100 });
        cy.get('form input[type="password"]').type('123456', { delay: 100 });
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('button').contains('Delete NFT').should('exist');
        cy.get('button').contains('Buy NFT').should('exist');

        cy.get('button').contains('Delete NFT').click();

        cy.get('h3').contains('Delete NFT').should('exist');
        cy.get('p').contains('Are you sure you want to delete Kondyo? All of your data will be permanently removed. This action cannot be undone.').should('exist');

        // cancel delete
        cy.get('button').contains('Cancel').click();

        // check NFT comment is NOT deleted
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

        cy.get('button').contains('Delete NFT').click();

        // confirm delete
        cy.get('h3').contains('Delete NFT').parent().parent().parent().parent().within(() => {
            cy.get('button').contains('Delete').click();
        });

        cy.get('div').contains('Successfully deleted Kondyo!').should('exist');

        // check NFT comment is deleted
        cy.request('GET', 'http://localhost:3030/data/nfts').then((response) => {
            expect(response.body).to.have.length(11);
            let isFound = false;
            response.body.forEach((nft) => {
                if (nft.title === 'Kondyo') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.false;
        });

        cy.get('nav').contains('Log Out').click();
    });

    it("buy and sell nft - auth but not owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('george@abv.bg', { delay: 100 });
        cy.get('form input[type="password"]').type('123456', { delay: 100 });
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Pirate', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('button').contains('Buy NFT').should('exist');

        cy.get('button').contains('Buy NFT').click();
        cy.get('div').contains('Successfully bought Pirate for 7 ETH!').should('exist');

        // navigated to My Portfolio
        cy.get('h1').contains('My NFT Collection').should('exist');

        // check NFT bought successfully
        cy.request('GET', 'http://localhost:3030/data/portfolio').then((response) => {
            expect(response.body).to.have.length(4);
        });

        cy.get('h5').contains('Pirate').parent().within(() => {
            cy.get('button').contains('Sell NFT').click();
        });

        cy.get('p').contains('Are you sure you want to sell Pirate?').should('exist');

        // cancel delete
        cy.get('button').contains('Cancel').click();

        // check NFT sell cancelled
        cy.request('GET', 'http://localhost:3030/data/portfolio').then((response) => {
            expect(response.body).to.have.length(4);
        });

        cy.get('h5').contains('Pirate').parent().within(() => {
            cy.get('button').contains('Sell NFT').click();
        });

        // cancel sell
        cy.get('button').contains('Cancel').click();

        // check NFT sell cancelled
        cy.request('GET', 'http://localhost:3030/data/portfolio').then((response) => {
            expect(response.body).to.have.length(4);
        });

        cy.get('h5').contains('Pirate').parent().within(() => {
            cy.get('button').contains('Sell NFT').click();
        });

        // confirm sell
        cy.get('h3').contains('Sell NFT').parent().parent().parent().parent().within(() => {
            cy.get('button').contains('Sell').click();
        });

        cy.get('div').contains('Successfully sold Pirate!').should('exist');

        // check NFT sell successful
        cy.request('GET', 'http://localhost:3030/data/portfolio').then((response) => {
            expect(response.body).to.have.length(3);
        });

        cy.get('h5').contains('Pirate').should('not.exist');

        cy.get('nav').contains('Log Out').click();
    });
});
