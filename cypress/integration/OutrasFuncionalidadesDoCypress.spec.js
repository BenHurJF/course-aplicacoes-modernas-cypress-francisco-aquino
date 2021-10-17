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

    it('Commands...', () => {
        cy.popup('#otherButton', 'Click OK!')
    })


    describe('Testes Dinâmicos...', () => {
        beforeEach('', () => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })

        const food = ['Carne', 'Frango', 'Pizza', 'Vegetariano']
        food.forEach( food => {
        it(`Cadastro com comidas: ${food}...`, () => {
            cy.get('#formNome').type('Testando')
            cy.get('#formSobrenome').type('Ben-Hur')
            cy.get(`table[id='formSexo'] input[id='formSexoMasc']`).check()
            cy.xpath(`//label[contains(.,'${food}')]/../input`).check()
            cy.get('#formEscolaridade').select('doutorado')
            cy.get('#formEsportes').select('futebol')
            cy.get(`input[value='Cadastrar']`).click()
            cy.xpath(`//span[contains(.,'Cadastrado')]`).should('contain', 'Cadastrado')
        })
        })

        it('Deve selecionar todos usando o EACH', () => {
            cy.get('#formNome').type('Testando')
            cy.get('#formSobrenome').type('Ben-Hur')
            cy.get(`table[id='formSexo'] input[id='formSexoMasc']`).check()

            // cy.get(`[name=formComidaFavorita]`).click({multiple:true}) // OU ->>

            cy.get(`[name=formComidaFavorita]`).each($elem => { 
                // Vai clicar em cada um dos checkbox desse formComidaFavorita sendo de acordo
                // com a condição -> se for diferente de vegetariano = pode clicar.
                if($elem.val() != 'vegetariano')
                cy.wrap($elem).click()
            })

            cy.get('#formEscolaridade').select('doutorado')
            cy.get('#formEsportes').select('futebol')
            cy.get(`input[value='Cadastrar']`).click()
            cy.xpath(`//span[contains(.,'Cadastrado')]`).should('contain', 'Cadastrado')
            // cy.clickAlert('#formCadastrar', 'Tem certeza que voce eh vegetariano?')
        })
    })

    describe('Testes Dinâmicos...', () => {
        beforeEach('', () => {
            cy.visit('https://wcaquino.me/cypress/componentes.html')
        })
    it('Alterar campo de tempo/Time', () => {
    //   cy.get(`input[id='buttonNow']`).click()
    //   cy.get(`div[id='resultado'] span`).should('contain', '17/10/2021')

    //   cy.clock()
    //   cy.get(`input[id='buttonNow']`).click()
    //   cy.get(`div[id='resultado'] span`).should('contain', '31/12/1969')

      const dt = new Date(2014, 6, 11, 15, 34, 33)
      cy.clock(dt.getTime())
      cy.get(`input[id='buttonNow']`).click()
      cy.get(`div[id='resultado'] span`).should('contain', '11/07/2014')
    })

    it.only('avançar tempo no futuro', () => {
        cy.get('#buttonTimePassed').click()
        // cy.get(`div[id='resultado'] span`).should('contain', '163')
        cy.get('#resultado > span').invoke('text').then(( $text => {
           cy.wrap($text).should('gt', 16344487)
        }))
    })
})
})