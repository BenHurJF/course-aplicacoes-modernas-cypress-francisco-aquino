/// <reference types="cypress" />

const element = require('../elements/testeElements').ELEMENTS;

class teste {
     fazerLogin() {
         cy.get(element.teste).should('be.visible');
     }
}

export default new teste;