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
       cy.get('[data-test=dataEscolaridade] option')
       .should('have.length', 8)
       cy.get('[data-test=dataEscolaridade] option').then($array => {  
           // Pega as opções do combobox e ENTÃO (.then) joga na variável $arary, que executa uma função
           const values = []
           // Define uma constante values com array vazio para preencher logo a frente
           $array.each(function() {
            // Pega a variável $array, e (each) = para cada elemento do array execute a function
               values.push(this.innerHTML)
            // Será executado = pega a constante "values" com o array vazio, 
            // e dá um push (Empurre) no array os elementos do combobox pelo INNERHTML
            // Ou seja = a function pega o values e empurra os elementos dos options dentro desse array
           })
           expect(values).to.include.members(["Superior", "Mestrado"])
           // e aqui rola um expect, = Espera-se que esteja incluso dentro de values os seguintes membros -> ["", ""] 
       })

    })

    it.only('Combo múltiplo', () => {
        //TODO VALIDAR OPÇÕES SELECIONADAS NO COMBO DE SELEÇÃO
         cy.get('[data-testid=dataEsportes]')
         .select( ['natacao', 'Corrida', 'nada'] )
        // Forma simples de validar os selecionados ->
        // Não funciona -> cy.get('[data-testid=dataEsportes]').should('have.value', ['natacao', 'Corrida', 'nada'])
        cy.get('[data-testid=dataEsportes]').then($ele => {
            // Usando promise funciona !!!
            expect($ele.val()).to.be.deep.equal(['natacao', 'Corrida', 'nada'])
            expect($ele.val()).to.have.length(3)
        })
        
         // OBS: ESSAS VALIDAÇÕES SÓ FUNCIONAM POIS OS COMBOBOX JÁ ESTÃO SELECIONADOS LÁ EM CIMA
         // Validando pelo invoke = INVOCAR OS VALORES DO ARRAY 
         // (e como selecionou alguns lá em cima o INVOKE trás o array já com os select), 
         // e Logo em seguida Verificando com Should 'eql' que significa o (deep equal = Profundamente Igual)
         // E Valida se está profundamente igual aos -> ['natacao', 'Corrida', 'nada']
        cy.get('[data-testid=dataEsportes]')
        .invoke('val')
        .should('eql', ['natacao', 'Corrida', 'nada'])
        
    })

    describe('Titulos', () => {
       before(() => {
        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);
    });
    });
        it.only('Titulo', () => {
            cy.title().should('be.equal', 'Campo de Treinamento')

            cy.title().then(title => {
                console.log(title)
            } )
        })
    });
});
});