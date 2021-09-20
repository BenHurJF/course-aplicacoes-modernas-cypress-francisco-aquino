/// <reference types='Cypress' />

import Assert from '../support/pages/asserts/';

describe('Assertions do curso Aplicações modernas com Cypress', () => {
    
    before(() => {
        cy.fixture('teste').then((teste) => {
          cy.visit(teste.url);
        
          cy.server().should((server) => {
            expect(server.method).to.eq('GET');
            if(server.status !== 200) {
              let msg = alert('falhou');
              msg();
            } else {
              cy.wait(200).then(() => {
              console.log('deu tudo certo') 
              })};
    });
  });
});

    it('Asserts comuns', () => {
        Assert.fazerAssert();
    });

    it('Outros Asserts', () => {
        Assert.outroAssert();
    });
    
    it('Asserts com ARRAYS', () => {
        Assert.assertComArray();
    });
    
    it('Asserts a nível de TIPOS', () => {
        Assert.assertNivelDeTipos();
    });

    it('Asserts NÚMEROS', () => {
        Assert.numeros();
    });
    
    it('Desafio - Localizar elemento e capturar valor', () => {
        cy.get('#buttonSimple')
        .click()
        // HAVE.VALUE =>> ESSE BOTAO DEVE POSSUIR O VALUE =>>
        .should('have.value', 'Obrigado!')
    });
});