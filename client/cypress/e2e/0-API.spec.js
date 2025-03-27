/// <reference types="cypress" />

describe('API Responses Tests Suite', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
    });

    describe('login', () => {
        it('successful login - 200', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3030/users/login',
                body: {
                    email: 'peter@abv.bg',
                    password: '123456'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });

        it('NOT successful login - 403', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3030/users/login',
                body: {
                    email: 'peter@abv.bg',
                    password: 'not-correct'
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(403);
            });
        });
    });

    describe('register', () => {
        it('successful register - 200', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3030/users/register',
                body: {
                    email: 'manol@abv.bg',
                    password: '123456',
                    username: 'manol'
                },
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((response) => {
                expect(response.status).to.eq(200);
            });
        });

        it('NOT successful register - 409', () => {
            cy.request({
                method: 'POST',
                url: 'http://localhost:3030/users/register',
                body: {
                    email: 'manol@abv.bg',
                    password: '123456',
                    username: 'manol'
                },
                headers: {
                    'Content-Type': 'application/json'
                },
                failOnStatusCode: false
            }).then((response) => {
                expect(response.status).to.eq(409);
            });
        });
    });

    describe('latest NFTs', () => {
        it('should return an array of 3 elements from the endpoint', () => {
            cy.request('http://localhost:3030/data/nfts?sortBy=_createdOn%20desc&pageSize=3')
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.be.an('array');
                    expect(response.body).to.have.length(3);
                });
        });
    });

    describe('all NFTs', () => {
        it('should return an array of 12 elements from the endpoint', () => {
            cy.request('http://localhost:3030/data/nfts')
                .then((response) => {
                    expect(response.status).to.eq(200);
                    expect(response.body).to.be.an('array');
                    expect(response.body).to.have.length(12);
                });
        });
    });
});