import signupFactory from "../support/SignupFactory"
describe('Signup', () => {
    beforeEach(() => {
        cy.visitPage()
    })
    it('CT-001 - User should be deliver', function () {
        var deliver = signupFactory.deliver()        
        cy.fillForm(deliver)
        cy.submitButton()

        const expectedMessage = 'Recebemos os seus dados. Fique de olho na sua caixa de email, pois e em breve retornamos o contato.'
        cy.modalContentShouldBe(expectedMessage)
    })

    it('CT-002 - Incorrect document', function () {
        var deliver = signupFactory.deliver()
        deliver.cpf = '000000141aa'
       
        cy.fillForm(deliver)
        cy.submitButton()
        cy.alertMessageShouldBe('Oops! CPF inválido')
    })

    it('CT-003 - Incorrect email', function () {
        var deliver = signupFactory.deliver()
        deliver.email = 'user.com.br'
        
        cy.fillForm(deliver)
        cy.submitButton()
        cy.alertMessageShouldBe('Oops! Email com formato inválido.')
    })

    context('CT-004 - Required fields', function () {

        const messages = [
            { field: 'name', output: 'É necessário informar o nome' },
            { field: 'cpf', output: 'É necessário informar o CPF' },
            { field: 'email', output: 'É necessário informar o email' },
            { field: 'postalcode', output: 'É necessário informar o CEP' },
            { field: 'number', output: 'É necessário informar o número do endereço' },
            { field: 'delivery_method', output: 'Selecione o método de entrega' },
            { field: 'cnh', output: 'Adicione uma foto da sua CNH' }
        ]

        beforeEach(() => {
            cy.visitPage()
            cy.submitButton()
            cy.wait(1000)
        })        

        messages.forEach(function(msg){
            it(`${msg.field} is required`, function(){
                cy.alertMessageShouldBe(msg.output)                
                cy.wait(1000)
            })            
        })
    })
})