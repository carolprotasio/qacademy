Cypress.Commands.add('visitPage', () => {
    cy.visit('/')

    cy.get('a[href="/deliver').click()
    cy.get('#page-deliver form h1').should('have.text', 'Cadastre-se para  fazer entregas')
})
Cypress.Commands.add('fillForm', (deliver) => {
    cy.get('input[name="fullName"]').type(deliver.name)
        cy.get('input[name="cpf"]').type(deliver.cpf)
        cy.get('input[name="email"]').type(deliver.email)
        cy.get('input[name="whatsapp"]').type(deliver.whatsapp)

        cy.get('input[name="postalcode"]').type(deliver.address.postalcode)

        cy.fixture('mockcep').then(function(mockcep){
            cy.intercept('GET', 'https://viacep.com.br/ws/**', {
                statusCode: 200,
                body: mockcep
            }).as('mockCep')            
        })       

        cy.get('input[type=button][value="Buscar CEP"]').click()
        cy.wait('@mockCep', { timeout: 10000 })

        cy.get('input[name="address-number"]').type(deliver.address.number)
        cy.get('input[name="address-details"]').type(deliver.address.details)

        cy.get('input[name="address"]').should('have.value', deliver.address.street)
        cy.get('input[name="district"]').should('have.value', deliver.address.district)
        cy.get('input[name="city-uf"]').should('have.value', deliver.address.city_state)

        cy.contains('.delivery-method li', deliver.delivery_method).click()
        cy.get('input[accept^="image"]').attachFile('images/cnh-digital.jpg')
   
})
Cypress.Commands.add('modalContentShouldBe', (expectedMessage) => {
    cy.get('.swal2-container .swal2-html-container')
    .should('have.text', expectedMessage)
})
Cypress.Commands.add('submitButton', () => {
    cy.get('form button[type="submit"]').click()
})
Cypress.Commands.add('alertMessageShouldBe', (expectedMessage) => {       
    cy.contains('.alert-error', expectedMessage, { timeout: 10000 }).should('be.visible')
})


