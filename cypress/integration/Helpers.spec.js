/// <reference types="Cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const objeto = {nome: 'user', idade: 20}
        expect(objeto).to.have.property('nome')
        cy.wrap(objeto).should('have.property', 'idade')

        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);
        });
    })
})