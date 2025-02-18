/// <reference types="cypress" />

describe("Login Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("login form UI", () => {
        cy.get('nav').contains('Login').click();
        cy.get('h1').contains('Sign in to your account').should('exist');
        cy.get('form label[for="email"]').contains('Your email').should('exist');
        cy.get('form input[placeholder="name@company.com"]').should('exist');
        cy.get('form label[for="password"]').contains('Password').should('exist');
        cy.get('form input[placeholder="••••••••"]').should('exist');
        cy.get('button').contains('Log In').should('exist');
        cy.get('p').contains('Don\'t have an account yet?').should('exist');
        cy.get('a').contains('Register').should('exist');
    });

    it("login form submitted with valid credentials", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('peter@abv.bg', {delay: 100});
        cy.get('form input[type="password"]').type('123456', {delay: 100});
        cy.get('button').contains('Log In').click();
        cy.get('nav span').contains('Welcome, Peter').should('exist');

        // check local storage
        cy.window().then((window) => {
            const auth = JSON.parse(window.localStorage.getItem('auth'));
            expect(auth).to.have.property('email', 'peter@abv.bg');
        });

        // logout
        cy.get('nav').contains('Log Out').click();
    });

    it("login form submitted with invalid credentials", () => {
        cy.get('nav').contains('Login').click();
        cy.get('form input[type="email"]').type('wrong@email.com', {delay: 100});
        cy.get('form input[type="password"]').type('wrongpassword', {delay: 100});
        cy.get('button').contains('Log In').click();
        cy.get('div').contains('Email or password don\'t match').should('exist');
        cy.get('nav span').contains('Welcome, Peter').should('not.exist');
        
        // check local storage
        cy.window().then((window) => {
            const auth = JSON.parse(window.localStorage.getItem('auth'));
            expect(auth).to.be.null;
        });
    });

    it("login form Register button", () => {
        cy.get('nav').contains('Login').click();
        cy.get('a').contains('Register').click();
        cy.get('h1').contains('Create an account').should('exist');
    });
});
