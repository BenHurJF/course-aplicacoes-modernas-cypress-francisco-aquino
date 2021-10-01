/// <reference types='Cypress' />

// Fixture -> POVOAR OS TESTES COM DADOS DO FIXTURES

describe('Fixtures testes', () => {
    before('', () => {
    //    cy.visit('https://wcaquino.me/cypress/componentes.html')
    })
       
   

    it('Get DATA from fixture file', function () {
        cy.fixture('userData').as('site').then(() => {
            cy.visit(this.site.url)
        })
        

        cy.fixture('userData').as('usuario').then(() => {
            cy.get('#formNome').type(this.usuario.nome)
            .should('have.value', this.usuario.nome)
            cy.get('#formSobrenome').type(this.usuario.sobrenome)
            .should('have.value', this.usuario.sobrenome)
         })
    })

    it.only('Commands...', () => {
       cy.popup('#otherButton', 'Click OK!')
    })
})