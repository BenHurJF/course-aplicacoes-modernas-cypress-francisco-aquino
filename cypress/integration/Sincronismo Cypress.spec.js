/// <reference types= "Cypress" />

describe('Sincronismo Cypress', () => {
    
    beforeEach(() => {
        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);    
    }); 
});
    
    it('Deve aguardar elemento ficar disponível', () => {
        cy.get('#novoCampo')
        .should('not.exist')

        cy.get('#buttonDelay')
        .click()
        // ainda nao deve aparecer, pois tem o delay
        cy.get('#novoCampo')
        .should('not.exist')

        // ate que um determinado momento vai existir
        cy.get('#novoCampo')
        .should('exist')

        cy.get('#novoCampo')
        .type('Testes com Cypress')
        .should('be.visible')
    });

    it('Deve fazer Retrys', () => {
        cy.get('#novoCampo')
        .should('not.exist')

        cy.get('#buttonDelay')
        .click()

        cy.get('#novoCampo')
        .should('exist')
    })
})