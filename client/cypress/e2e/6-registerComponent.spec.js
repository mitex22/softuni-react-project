/// <reference types="cypress" />

describe("Register Component Tests Suite", () => {
    beforeEach(() => {
        cy.visit('/');
    });

    it("register form UI", () => {
        cy.get('nav').contains('Register').click();
        cy.get('h1').contains('Create an account').should('exist');
        cy.get('form label[for="email"]').contains('Your email').should('exist');
        cy.get('form input[placeholder="name@company.com"]').should('exist');
        cy.get('form label[for="username"]').contains('Your username').should('exist');
        cy.get('form input[placeholder="jorko0o0o"]').should('exist');
        cy.get('form label[for="password"]').contains('Password').should('exist');
        cy.get('form input[placeholder="••••••••"]').should('exist');
        cy.get('form label[for="confirm-password"]').contains('Confirm password').should('exist');
        cy.get('form input[placeholder="••••••••"]').should('exist');
        cy.get('button').contains('Register').should('exist');
        cy.get('p').contains('Already registered?').should('exist');
        cy.get('a').contains('Log In').should('exist');
    });

    it("register form submitted with valid credentials", () => {
        cy.get('nav').contains('Register').click();
        cy.get('form input[type="email"]').type('manol@abv.bg', {delay: 100});
        cy.get('form input[type="text"]').type('Manol', {delay: 100});
        cy.get('form input[type="password"]').eq(0).type('123123', {delay: 100});
        cy.get('form input[type="password"]').eq(1).type('123123', {delay: 100});
        cy.get('button').contains('Register').click();
        cy.get('nav span').contains('Welcome, Manol').should('exist');

        // check local storage
        cy.window().then((window) => {
            const auth = JSON.parse(window.localStorage.getItem('auth'));
            expect(auth).to.have.property('email', 'manol@abv.bg');
        });

        // logout
        cy.get('nav').contains('Log Out').click();
    });

    it("register form submitted with valid credentials but user already exists", () => {
        cy.get('nav').contains('Register').click();
        cy.get('form input[type="email"]').type('manol@abv.bg', {delay: 100});
        cy.get('form input[type="text"]').type('Manol', {delay: 100});
        cy.get('form input[type="password"]').eq(0).type('123123', {delay: 100});
        cy.get('form input[type="password"]').eq(1).type('123123', {delay: 100});
        cy.get('button').contains('Register').click();
        cy.get('form input[type="email"]').parent().siblings('span').contains('A user with the same email already exists!').should('exist');
        cy.get('nav span').contains('Welcome, Peter').should('not.exist');
        
        // check local storage
        cy.window().then((window) => {
            const auth = JSON.parse(window.localStorage.getItem('auth'));
            expect(auth).to.be.null;
        });
    });

    it("register form submitted with invalid credentials", () => {
        cy.get('nav').contains('Register').click();
        cy.get('form input[type="email"]').type('stamat@abv.bg', {delay: 100});
        cy.get('form input[type="text"]').type('St', {delay: 100});
        cy.get('button').contains('Register').click();
        cy.get('nav span').contains('Welcome, St').should('not.exist');
        cy.get('form input[type="text"]').parent().siblings('span').contains('Username must be at least 3 characters!').should('exist');
        cy.get('form input[type="text"]').clear().type('Stamat', {delay: 100});
        cy.get('form input[type="text"]').parent().siblings('span').should('not.exist');

        cy.get('form input[type="password"]').eq(0).type('12312', {delay: 100});
        cy.get('button').contains('Register').click();
        cy.get('nav span').contains('Welcome, Stamat').should('not.exist');
        cy.get('form input[type="password"]').eq(0).parent().siblings('span').contains('Password must be at least 6 characters!').should('exist');
        cy.get('form input[type="password"]').eq(0).clear().type('123123', {delay: 100});
        cy.get('form input[type="password"]').eq(0).parent().siblings('span').should('not.exist');

        cy.get('form input[type="password"]').eq(1).type('12312', {delay: 100});
        cy.get('button').contains('Register').click();
        cy.get('nav span').contains('Welcome, Stamat').should('not.exist');
        cy.get('form input[type="password"]').eq(1).parent().siblings('span').contains('Password and Confirm Password must match!').should('exist');
        cy.get('form input[type="password"]').eq(1).clear().type('123123', {delay: 100});
        cy.get('form input[type="password"]').eq(1).parent().siblings('span').should('not.exist');
        
        // check local storage
        cy.window().then((window) => {
            const auth = JSON.parse(window.localStorage.getItem('auth'));
            expect(auth).to.be.null;
        });
    });

    it("register form Log In button", () => {
        cy.get('nav').contains('Register').click();
        cy.get('a').contains('Log In').click();
        cy.get('h1').contains('Sign in to your account').should('exist');
    });
});
