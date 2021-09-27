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

    it('Uso do Find', () => {
        cy.get('#buttonList').click();

        cy.get('#lista li')
            .find('span')
            .should('contain', 'Item 1');

        ///
        /// cy.wait(3000) UTILIZAR O TIMEOUT PARA ESPERA ESPECÍFICA EM ELEMENTOS
        ///
        cy.get('#lista li span')
            .should('contain', 'Item 2')
    })

    it('Uso do timeout', () => {
        cy.get('#buttonDelay')
        .click()

        cy.get('#novoCampo', { timeout: 4000 }).should('exist')

        cy.get('#buttonListDOM').click()
        cy.get('#lista li span')
        .should('have.length', 1)
        cy.get('#lista li span')
        .should('have.length', 2)
    })

    it('Should vs Then', () => {
        cy.get('#buttonListDOM').should($el1 => {

            expect($el1).to.have.length(1)
            }).and('have.id', 'buttonListDOM')


     //   cy.get('#lista li span').then($el => {
       //     expect($el).to.have.length(1)
            
           /** cy.wait(5000)
            cy.get('#lista li span').then($el2 => {
                //console.log($el2)
                expect($el2).to.have.length(2)  */
    // })
    })
})