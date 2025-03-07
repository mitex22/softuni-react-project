/// <reference types="cypress" />

describe("NFT Comments Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("submit nft comment - auth and owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', {delay: 100});
        cy.get('form input[type="password"]').type('123456', {delay: 100});
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('textarea[placeholder="Leave a comment..."]').type('This is an automated comment from owner!', { delay: 100 });
        cy.get('button').contains('Submit').click();

        cy.wait(2000);

        // check NFT comment is created
        cy.request('GET', 'http://localhost:3030/data/comments').then((response) => {
            expect(response.body).to.have.length(3);
            let isFound = false;
            response.body.forEach((comment) => {
                if (comment.comment === 'This is an automated comment from owner!') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.true;
        });

        cy.get('nav').contains('Log Out').click();
    });

    it("delete nft comment - auth and owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', {delay: 100});
        cy.get('form input[type="password"]').type('123456', {delay: 100});
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('p').contains('This is an automated comment from owner!').should('exist');
        cy.get('p').contains('This is an automated comment from owner!').parent().within(() => {
            cy.get('button').contains('Delete').click();
        });

        // cancel delete
        cy.get('h3').contains('Delete comment').should('exist');
        cy.get('p').contains('Are you sure you want to delete this comment?').should('exist');
        cy.get('button').contains('Cancel').click();
        cy.get('p').contains('This is an automated comment from owner!').should('exist');

        // check NFT comment is NOT deleted
        cy.request('GET', 'http://localhost:3030/data/comments').then((response) => {
            expect(response.body).to.have.length(3);
            let isFound = false;
            response.body.forEach((comment) => {
                if (comment.comment === 'This is an automated comment from owner!') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.true;
        });

        // confirm delete
        cy.get('p').contains('This is an automated comment from owner!').parent().within(() => {
            cy.get('button').contains('Delete').click();
        });

        cy.get('h3').contains('Delete comment').should('exist');
        cy.get('p').contains('Are you sure you want to delete this comment?').should('exist');
        cy.get('h3').contains('Delete comment').parent().parent().parent().parent().within(() => {
            cy.get('button').contains('Delete').click();
        });
        cy.get('p').contains('This is an automated comment from owner!').should('not.exist');

        cy.get('div').contains('Successfully deleted comment!').should('exist');

        // check NFT comment is deleted
        cy.request('GET', 'http://localhost:3030/data/comments').then((response) => {
            expect(response.body).to.have.length(2);
            let isFound = false;
            response.body.forEach((comment) => {
                if (comment.comment === 'This is an automated comment from owner!') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.false;
        });

        cy.get('nav').contains('Log Out').click();
    });

    it("submit nft comment - auth but not owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('george@abv.bg', {delay: 100});
        cy.get('form input[type="password"]').type('123456', {delay: 100});
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('textarea[placeholder="Leave a comment..."]').type('This is an automated comment but NOT from owner!', { delay: 100 });
        cy.get('button').contains('Submit').click();

        cy.wait(2000);

        // check NFT comment is created
        cy.request('GET', 'http://localhost:3030/data/comments').then((response) => {
            expect(response.body).to.have.length(3);
            let isFound = false;
            response.body.forEach((comment) => {
                if (comment.comment === 'This is an automated comment but NOT from owner!') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.true;
        });

        cy.get('nav').contains('Log Out').click();
    });

    it("delete nft comment - auth but not owner", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('george@abv.bg', {delay: 100});
        cy.get('form input[type="password"]').type('123456', {delay: 100});
        cy.get('button').contains('Log In').click();

        cy.get('nav').contains('All NFTs').click();
        cy.get('input[placeholder="Search by NFT title..."]').type('Kondyo', { delay: 100 });
        cy.get('a').contains('Details').click();

        cy.get('p').contains('This is an automated comment but NOT from owner!').should('exist');
        cy.get('p').contains('This is an automated comment but NOT from owner!').parent().within(() => {
            cy.get('button').contains('Delete').click();
        });

        // cancel delete
        cy.get('h3').contains('Delete comment').should('exist');
        cy.get('p').contains('Are you sure you want to delete this comment?').should('exist');
        cy.get('button').contains('Cancel').click();
        cy.get('p').contains('This is an automated comment but NOT from owner!').should('exist');

        // check NFT comment is NOT deleted
        cy.request('GET', 'http://localhost:3030/data/comments').then((response) => {
            expect(response.body).to.have.length(3);
            let isFound = false;
            response.body.forEach((comment) => {
                if (comment.comment === 'This is an automated comment but NOT from owner!') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.true;
        });

        // confirm delete
        cy.get('p').contains('This is an automated comment but NOT from owner!').parent().within(() => {
            cy.get('button').contains('Delete').click();
        });

        cy.get('h3').contains('Delete comment').should('exist');
        cy.get('p').contains('Are you sure you want to delete this comment?').should('exist');
        cy.get('h3').contains('Delete comment').parent().parent().parent().parent().within(() => {
            cy.get('button').contains('Delete').click();
        });
        cy.get('p').contains('This is an automated comment but NOT from owner!').should('not.exist');

        cy.get('div').contains('Successfully deleted comment!').should('exist');

        // check NFT comment is deleted
        cy.request('GET', 'http://localhost:3030/data/comments').then((response) => {
            expect(response.body).to.have.length(2);
            let isFound = false;
            response.body.forEach((comment) => {
                if (comment.comment === 'This is an automated comment but NOT from owner!') {
                    isFound = true;
                }
            });
            expect(isFound).to.be.false;
        });

        cy.get('nav').contains('Log Out').click();
    });
});
