/// <reference types="Cypress" />


describe('Pontos Importantes para soluções', () => {

    before('visit', () => {
        cy.visit(Cypress.env('url'))
    })

    beforeEach('Reload', () => {
        cy.reload();
    })

    it('Alerts...', () => {
        // Validar mensagem de alert no cypress ->
        cy.get('#alert').click() // click no botão que chama o alert
        cy.on('window:alert', msg => {
            // cy.on que pega EVENTOS da página, no caso window:alert, e joga no 
            // parâmetro 'msg' a mensagem que vai aparecer em alert
            console.log(msg)
            // exibe no console a msg
            expect(msg).to.be.equal('Alert Simples')
            // e faz a assertiva se é esperado que na 'msg' tenha o -> 'Alert Simples'
        })
    })

    it('Alert com mock', () => {
        // Validar mensagem de alert no cypress 2 Jeito ->
        const stub = cy.stub().as('Alerta') // 'cy.stub' meio que guarda a interação em uma function

        cy.on('window:alert', stub) // Aqui chama o stub
        cy.get('#alert').click().then(() => {
            expect(stub.getCall(0)).to.be.calledWith('Alert Simples')
            // espera-se que 'stub' que é a função que está o alert, 
            // .getCall(0) = pegando a primeira chamada que é o alert (podendo talvez validar outros alerts)
            // com a mensagem 'Alert Simples', e verifique que 
            // .calledWith = chamado com ou é o mesmo chamado que = 'Alert Simples' 
            // OU -> Espera-se que seja chamado com os argumentos "Alert Simples"
        })
    })

    it('Um Alert atrás do outro...', () => {

        cy.on('window:confirm', msgConfirm => {
            // cy.on que pega EVENTOS da página, no caso window:alert, e joga no 
            // parâmetro 'msg' a mensagem que vai aparecer em alert
            console.log(msgConfirm)
            // exibe no console a msg
            expect(msgConfirm, { timeout: 3000 }).to.be.equal('Confirm Simples')
            // e faz a assertiva se é esperado
        })
        cy.on('window:alert', msgAlert => {
            expect(msgAlert).to.be.equal('Confirmado')
        })

        cy.get('#confirm').click()
    })


    it('Negar o Alert...', () => {

        cy.on('window:confirm', msgConfirm => {
            expect(msgConfirm, { timeout: 3000 }).to.be.equal('Confirm Simples')
            return false;
        })
        cy.on('window:alert', msgAlert => {
            expect(msgAlert).to.be.equal('Negado')
            console.log(msgAlert)
        })

        cy.get('#confirm').click()
    })

    it('Trabalhando com PROMPT do navegador', () => {
        cy.window().then(win => { // cy.window = Será um elemento window, então '.then' execute a função, usando o parâmetro win, cy.stub pega o parâmetro window do tipo 'prompt'
            cy.stub(win, 'prompt').returns('12')
        })
        cy.on('window:confirm', confirm => {
            expect(confirm).to.be.equal('Era 12?')
        })
        cy.on('window:alert', alert => {
            expect(alert).to.be.equal(':D')
        })

        cy.get('#prompt').click()
    })

    it('Desafio - Validar Mensagens', () => {
      
        // Para MUITOS Alerts - Utilizamos STUBS
       // Botão cadastrar - Nome obrigatorio
      const stub = cy.stub().as('alerta') // para Usar e validar os alerts que virá a parecer na tela
      cy.on('window:alert', stub) // Atribuindo os alerts que aparecer na tela ao Stub

      cy.get('#formCadastrar').click()
      .then(() => expect(stub.getCall(0)).to.be.calledWith('Nome eh obrigatorio'))


       // Preenchendo nome e -> cadastrar -> Sobrenome Obrigatorio
       cy.get('#formNome').type('BenHur')
       .get('#formCadastrar').click()
       .then(() => expect(stub.getCall(1)).to.be.calledWith('Sobrenome eh obrigatorio'))

       // Preenchendo nome e Sobrenome -> Cadastrar -> Sexo é obrigatorio
       cy.get('#formSobrenome').type('Jeffer')
       .get('#formCadastrar').click()
       .then(() => expect(stub.getCall(2)).to.be.calledWith('Sexo eh obrigatorio'))
       
       // Verificando palavra 'Cadastrado'
       cy.get('#formSexoMasc').click()
       cy.get('#formCadastrar').click()
       cy.get('#resultado > :nth-child(1)').should('contain', 'Cadastrado!')
    })
})
    
describe('iFRAMES - Testando na página inicial - e página EXTERNA', () => {
    it('iFrames...Testando', () => {
        cy.visit(Cypress.env('url'))
       
        cy.get('#frame1').then( iframe => {
            // .contents = trás os filhos desse elemento, podendo da um .find('e aqui buscar o elemento')
            const body = iframe.contents().find('body') // Primeiro pegando o Body, e depois dando find em um elemento específico
            cy.wrap(body).find('#tfield')
            .type('Funcionou ?') // dando um type no campo
            .should('have.value', 'Funcionou ?') // e verificando se contém o texto nesse input
            
        /*    cy.on('window:alert', buttonIframe => { // padrão de alert, verificando se o alert que vai aparecer é igual ao texto -> Alert Simples
              expect(buttonIframe).to.be.equal('Alert Simples')
            })
            cy.wrap(body).find('#otherButton') // aqui dando um find em outro elemento dentro do body, que no caso é o botão e clicando
            .click()
        })   */
    })
})

    it('iFrames...Testando diretamente da página do iFrame', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.on('window:alert', buttonIframe => { // padrão de alert, verificando se o alert que vai aparecer é igual ao texto -> Alert Simples
            expect(buttonIframe).to.be.equal('Click OK!')
          })
          cy.get('#otherButton') // aqui dando um find em outro elemento dentro do body, que no caso é o botão e clicando
          .click()
    })
})

describe('POP-UPs diretamente', () => {
    it('pop-ups', () => {
        cy.visit('https://wcaquino.me/cypress/frame.html')

        cy.get('#otherButton').click()
        cy.on('window:alert', alertPopUp => {
            expect(alertPopUp).to.be.equal('Click OK!')
        })
    })

    it('Deve verificar se o pop-up foi invocado', () => {
        cy.visit(Cypress.env('url'))
        
        cy.window().then(win => { // PEGANDO UM EVENTO DE BROWSER E CHAMANDO PRO PARÂMETRO -> win
            cy.stub(win, 'open').as('winOpen') // Verificando que o pop-up de tela foi aberto, ele é do tipo OPEN
        })
        cy.get('#buttonPopUp').click()
        cy.get('@winOpen').should( 'be.called') // Validando que esse evento foi chamado = de abrir um pop-up/tela
})
})

describe.only('POP-UPs através de LINKS', () => {
     before(() => {
        cy.visit('https://wcaquino.me/cypress/componentes.html')
     })

     it('pop-up URL', () => {
         cy.contains('Popup2')
         .should('have.prop', 'href')
         .and('equal', 'https://wcaquino.me/cypress/frame.html')
     })


})