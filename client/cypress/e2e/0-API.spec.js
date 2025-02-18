/// <reference types="cypress" />

describe('Navigation and H1 validation', () => {
    beforeEach(() => {
        cy.visit('http://localhost:5173');
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