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

    it.only('Trabalhando com PROMPT do navegador', () => {
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
})