describe('login', () => {

    // Preduslov pre starta tetova
    before('open application', () => {
        // Otvaranje browser-a i navigacija na određen
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        // Verifikacija URL
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('admin_login_valid', () => {
        const testdata = data
            const admin_username = testdata.credentials.admin_username;
            const admin_password = testdata.credentials.admin_password;
            cy.get('input[name=username]').clear().type(admin_username)
            cy.get('input[name=password]').type(admin_password)
            cy.get('button[type=submit]').click()
    });

});