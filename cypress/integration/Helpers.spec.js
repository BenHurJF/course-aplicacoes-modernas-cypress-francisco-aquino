/// <reference types="Cypress" />


describe('Helpers', () => {
    it('Wrap', () => {
        const objeto = { nome: 'user', idade: 20 }
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
        const objeto = { id: 2, nome: 'Cypress automação', idade: 20 }
        cy.wrap(objeto).should('have.property', 'id', 2)
        cy.wrap(objeto).its('id').should('be.equal', 2)

        const objeto1 = { id: 3, nome: 'paulo', endereco: { bairro: 'Rec das Emas', rua: 'Av Ponte Alta', numero: 37 } }
        cy.wrap(objeto1).its('endereco').should('have.property', 'numero', 37)
        cy.wrap(objeto1).its('endereco').its('bairro').should('have.length.above', 4) // pega o objeto1 completo, pega o objeto endereco, pega o elemento bairro, e verifica se o conteúdo de bairro tem comprimento acima de 4
        cy.wrap(objeto1).its('endereco').its('bairro').should('have.length.below', 13) // Verificar no objeto endereco e depois no elemento bairro, se o conteúdo de Bairro tem comprimento abaixo de 13
        // cy.wrap(objeto1).its('endereco').its('rua').should('contain', 't') // TAMBÉM PODEMOS DESCER NÍVEIS COMO ->>>
        // cy.wrap(objeto1).its('endereco.numero').should('not.eq', 33) // verifica que numero não seja igual a 33

        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);
        });
    })

    it('INVOKE...', () => {
        const getValue = () => 1; // FUNÇÃO É CRIADA E RETORNA 1
        const soma = (a, b) => a + b;

        cy.wrap({ fn: getValue }).invoke('fn').should('be.equal', 1)
        // Com cy.wrap criamos um objeto e definimos um nome para receber a função
        // e logo após chamamos o .invoke e dentro colocamos a função que agora está atrelada ao objeto 'fn'

        cy.wrap({ sm: soma }).invoke('sm', 4, 6).should('be.equal', 10)
        // mesma coisa, agora inserindo os parâmetros para a soma 
        //ser realizada e logo fazer a asserção se bate os valores

        cy.fixture('teste').then((teste) => {
            cy.visit(teste.url);
        });

        cy.get('#formNome').then($camponome => {
            // Mais um exemplo pegando um elemento e colocando na variável e logo após retornando 
            // ações qeu são: Escrever no campo nome o type, e validar o value desse input
            cy.wrap($camponome).type('Estou progredindo em cypress')
            cy.wrap($camponome, { timeout: 2000 }).should('have.value', 'Estou progredindo em cypress')

            cy.get('#formNome').invoke('val', 'texto via invoke') // Get no campo nome, invoke chamando Jquery .val e inserindo o type 'texto via invoke'

            cy.window().invoke('alert', 'Alert do JS, da pra ver ?') // da o objeto windows, toda pagina tem o objeto window, é o que dá o controle na Tela inteira
            
            cy.get('#resultado')
            .invoke('html', '<input type="button" value="TROLEIII" /> ')
        })
    })

    it.only('Reutilizando o Título', () => {
        cy.visit(Cypress.env("url"));
        // const title = cy.get('body h3', { timeout: 2000 }).should('contain', 'Campo de Treinamento')

        let syncTitle 
        // Definindo uma variável 'fora do escopo do .then' que pode ser modificada ao 
        // longo dos testes caso precise REUTILIZAR esse valor em outros lugares

        cy.title().then(title => {
            console.log(title)

            cy.get('#formNome').type(title)

            syncTitle = title  // A Variável Let syncTitle recebe o título da page como atributo ou valor. para ser reutilizado em outro momento da page
        })

        cy.get('[data-cy=dataSobrenome]').then($elemento => {  
            // Transferindo o GET do campo 'sobrenome' em uma variável no '.then', 
            // para logo após ser utilizado um '.val' em JQuery que insere no campo Sobrenome o valor da variável syncTitle que é LET
            $elemento.val(syncTitle)
        })

        cy.get('#elementosForm\\:sugestoes').then($elementoSugestoes => {
            cy.wrap($elementoSugestoes).type(syncTitle)
        })
    })
})