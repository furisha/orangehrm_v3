describe('login', () => {

    // Preduslov - Hook "beforeEach" pre starta svakog testa
    beforeEach('open application', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.url().should('contains', '/auth/login')
    })

    it('admin_login_valid', () => {
        // Test kod
    });

    it('admin_login_invalid', () => {
        // Test kod
    });

});