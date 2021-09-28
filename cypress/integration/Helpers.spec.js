/// <reference types="Cypress" />

describe('Helpers', () => {
    it('Wrap', () => {
        const objeto = {nome: 'user', idade: 20}
        expect(objeto).to.have.property('nome')
        cy.wrap(objeto).should('have.property', 'idade')

       /* 
        cy.get('#formNome').then($el => {
            cy.wrap($el).type('Funcionou')
        })
        */cy.fixture('teste').then((teste) => {
            cy.visit(teste.url, { log: false });
        });

        const promise = new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(10)
            }, 5000)
        })

        cy.get('#buttonSimple').then(() => console.log('Econtrei o primeiro botão do site'))
        //promise.then(num => console.log(num))
        cy.wrap(promise).then(ret => console.log(ret))
        cy.get('#buttonLazy').then(() => console.log('Encontrei o segundo botão do site :)'))

        cy.wrap(1).then(num => {
            return 2
        }).should('be.equal', 2)

    })

    it('its........', () => {
        const objeto = { id: 2, nome: 'Cypress automação', idade: 20}
        cy.wrap(objeto).should('have.property', 'id', 2)
        cy.wrap(objeto).its('id').should('be.equal', 2)

        const objeto1 = { id: 3 , nome: 'paulo' , endereco: { bairro: 'Rec das Emas', rua: 'Av Ponte Alta', numero: 37 } }
        cy.wrap(objeto1).its('endereco').should('have.property', 'numero', 37)
        cy.wrap(objeto1).its('endereco').its('bairro').should('have.length.above', 4) // pega o objeto1 completo, pega o objeto endereco, pega o elemento bairro, e verifica se o conteúdo de bairro tem comprimento acima de 4
        cy.wrap(objeto1).its('endereco').its('bairro').should('have.length.below', 13) // Verificar no objeto endereco e depois no elemento bairro, se o conteúdo de Bairro tem comprimento abaixo de 13
        // cy.wrap(objeto1).its('endereco').its('rua').should('contain', 't') // TAMBÉM PODEMOS DESCER NÍVEIS COMO ->>>
        // cy.wrap(objeto1).its('endereco.numero').should('not.eq', 33) // verifica que numero não seja igual a 33
        
        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);
        });
    })

    it.only('INVOKE...', () => {
        const getValue = () => 1; // FUNÇÃO É CRIADA E RETORNA 1
        const soma = (a, b) => a + b;

        cy.wrap( { fn: getValue } ).invoke('fn').should('be.equal', 1) 
        // Com cy.wrap criamos um objeto e definimos um nome para receber a função
        // e logo após chamamos o .invoke e dentro colocamos a função que agora está atrelada ao objeto 'fn'
        
        cy.wrap( { sm: soma } ).invoke('sm', 4, 6).should('be.equal', 10) 
        // mesma coisa, agora inserindo os parâmetros para a soma 
        //ser realizada e logo fazer a asserção se bate os valores

        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);
        });

        cy.get('#formNome').then($camponome => {
            cy.wrap($camponome).type('Vai toma um banho ben-hur')
        })

    })
})