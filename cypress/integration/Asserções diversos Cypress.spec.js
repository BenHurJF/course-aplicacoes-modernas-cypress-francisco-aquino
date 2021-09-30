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
        const a = 1;
        expect(a).equal(1);
        expect(a, 'Deveria ser 1').equal(1);
        expect(a).to.be.equal(1);
        expect('a').not.to.be.equal('b');
    });

    it('Outros Asserts', () => {
        const obj = { 
            a : 1, 
            b : 2,
            c : 'Ben-Hur QA Automation'
        }
        expect(obj).equal(obj);
        expect(obj).equals(obj);
        expect(obj).to.be.equal(obj);
        expect(obj).to.be.deep.equal({a: 1, b: 2, c: 'Ben-Hur QA Automation'});
        // Assert para Igualar Exatamente
        expect(obj).eql({a: 1, b: 2, c: 'Ben-Hur QA Automation'});
        // Assert verificar que inclui dentro de OBJ
        expect(obj).include( {a: 1} );
        // Assert se dentro de (OBJ) possui a propriedade 'b' ->
        expect(obj).to.have.property('b');
        // Assert verificando que não é vazio ->
        expect(obj).to.not.be.empty;
        // Quando acessar esse cara, tem que estar vazio ->
        expect({}).to.be.empty;
    });

    it('Asserts com ARRAYS', () => {
        const array = [1, 2, 3, 4, 5];
         // Espera ter os membros descritos em colchetes no ARRAY
         expect(array).to.have.members([1, 2, 3, 4, 5]);
         // Espera que alguns desses membros esteja incluído no ARRAY
         expect(array).to.include.members([1, 2, 3]);
         // Verificar se o ARRAY está VAZIO ou não...
         expect(array).to.not.be.empty;
         // Espera que esse ARRAY citado (VAZIO) esteja VAZIO -> 
         expect([]).to.be.empty;
    });

    it('Asserts a nível de TIPOS', () => {
        const num = 1;
         const str = 'String';
         // Verificar se é do tipo número
         expect(num).to.be.a('number');
         // Verificar se é do tipo String
         expect(str).to.be.a('string');
         ////////////////////////////////

         const str1 = 'BenHurJF' + 2;
         // Comparar STRINGS
         expect(str1).to.be.equal('BenHurJF2');
         // Verificar se o tamanho dessa String  seja de 15 Caracteres (OU OQUE DESEJAR) ->
         expect(str1).to.have.length(9);
         // Verificar so um TRECHO da STRING -> STR1
         expect(str1).to.contains('Hur');
         // Verificar que existe apenas LETRAS
         expect(str1).to.match(/\w+/);
         // Verificar que não contém números
         expect(str1).to.match(/\D+/);
    });

    it('Asserts NÚMEROS', () => {
        const n1 = 4;
         const floatn1 = 4.321;
         // verificar se o numero seja igual a 4
         expect(n1).to.be.equal(4);
         // verificar se e acima de 3
         expect(n1).to.be.above(3);
         // se está abaixo de 5
         expect(n1).to.be.below(5);
         /// Float
         expect(floatn1).to.be.equal(4.321);
         // verificar se o float e proximo de... com uma precisao de 0.1
         expect(floatn1).to.be.closeTo(4.3, 0.1);
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