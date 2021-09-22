/// <reference types='Cypress' />

import Assert from '../support/pages/asserts';

describe('Assertions do curso Aplicações modernas com Cypress', () => {

    before(() => {
        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);
    
            cy.server().should((server) => {
                expect(server.method).to.eq('GET');
    
                if (server.status !== 200) {
                    let msg = console.log('falhou');
                    msg();
                } else {
                    cy.wait(server.status).then((status) => {
                        console.log('deu tudo certo')
                    })
                }});
    });
});

 /**   beforeEach(() => {
        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);
    });
});
*/

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

    it('Textos', () => {
        cy.get('body').should('contain', 'Cuidado');
        cy.get('span').should('contain', 'Cuidado');
        // Nesse elemento, Have.text (deve conter exatamente esse texto ->, '....')
        cy.get('.facilAchar').should('have.text', 'Cuidado onde clica, muitas armadilhas...');
    });

    it('Links', () => {
        cy.get('a[href="#"]').click()

        cy.get('#resultado')
            .should('have.text', 'Voltou!');

        cy.reload();
        cy.get('#resultado').should('have.not.text', 'Voltou!');

        cy.contains('Voltar').click()

        cy.get('#resultado')
            .should('have.text', 'Voltou!');
});

describe('Campos de Texto', () => {

    it('campos de texto', () => {
       
    });

    it('Radio Buttons', () => {
        cy.get('#formSexoFem')
        .click()
        .should('be.checked') // Verifica se o radioButton está checkado (Marcado)
        .should('have.value', 'F')

        cy.get('#formSexoMasc')
        .should('not.be.checked') // Veridica se o radioButton não está checkado (Marcado)

        cy.get('[name=formSexo]')
        .should('have.length', 2)
    });

    it('Checkbox', () => {
        cy.get('[name=formComidaFavorita]').click({multiple: true}) // Marcar múltiplos elementos-checkbox
        .should('be.checked');
    });

    it('Comboboxs', () => {
       cy.get('[data-test=dataEscolaridade]')
       .select('2o grau completo')
       .should('have.value', '2graucomp') // Assert pelo value do combobox
       //TODO Validar opcoes do combo
    })

    it('Combo múltiplo', () => {
        cy.get('[data-testid=dataEsportes]')
        .select( ['natacao', 'Corrida', 'nada'] )
        //TODO Validar opcoes selecionadas do combo
    })
});
});