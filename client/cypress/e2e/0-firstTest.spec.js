/// <reference types="cypress" />

describe('Navigation and H1 validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    it('should validate H1 text', () => {
        cy.get('h1').eq(1).should('have.text', 'Latest NFTs');
    });

    it('should check for existence of specific texts', () => {
        cy.contains('Counter Strike 8').should('exist');
        cy.contains('Counter Strike 7').should('exist');
        cy.contains('Kondyo').should('exist');
    });

    it('should navigate to login page and fail to login', () => {
        cy.get('nav').contains('Log Out').should('not.exist');
        cy.get('nav').contains('Login').click();
        cy.get('input[type="email"]').type('mitex22@abv.bg', { delay: 100 });
        cy.get('input[type="password"]').type('123123');
        cy.get('form').submit();
        cy.contains('Login or password don\'t match').should('exist');
    });

    it('should navigate to register page and register successfully', () => {
        cy.get('nav').contains('Log Out').should('not.exist');
        cy.get('nav').contains('Register').click();
        cy.get('input[type="email"]').type('mitex22@abv.bg', { delay: 100 });
        cy.get('input[type="text"]').type('mitex22', { delay: 100 });
        cy.get('input[type="password"]').eq(0).type('123123');
        cy.get('input[type="password"]').eq(1).type('123123');
        cy.get('form').submit();
        cy.get('nav').contains('Log Out').should('exist').click();
    });

    it('should navigate to login page and login successfully', () => {
        cy.get('nav').contains('Log Out').should('not.exist');
        cy.get('nav').contains('Login').click();
        cy.get('input[type="email"]').type('mitex22@abv.bg', { delay: 100 });
        cy.get('input[type="password"]').type('123123');
        cy.get('form').submit();
        cy.get('nav').contains('Log Out').should('exist').click();
    });

    describe('API response validation', () => {
        it('should return an array of three elements from the endpoint', () => {
            cy.request('http://localhost:3030/data/nfts?sortBy=_createdOn%20desc&pageSize=3')
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.be.an('array');
                    expect(response.body).to.have.length(3);
                });
        });
    });
});