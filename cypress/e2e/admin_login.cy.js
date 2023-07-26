const { onLoginPage } = require("../support/page_objects/login_page")

describe('login', () => {

    describe('login', () => {

    before('open application', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('admin_login_valid', () => {

        cy.intercept('POST', testdata.endpoints.login).as('postLogin')

        cy.get('input[name=username]').clear().type('Admin')
        cy.get('input[name=password]').type('admin123')

        cy.get('button[type=submit]').click()

        cy.wait('@postLogin').then(xhr => {
            expect(xhr.response.statusCode).to.equal('200')
        })
    });

});

});