describe('login', () => {

    // Preduslov pre starta tetova
    before('open application', () => {
        cy.visit('https://opensource-demo.orangehrmlive.com/')
        cy.url().should('eq', 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login')
    })

    it('admin_login_valid', () => {
        cy.get('input[name=username]').clear().type('Admin')
        cy.get('input[name=password]').type('admin123')

        cy.get('button[type=submit]').click()

        cy.url().should('contain', 'dashboard')
        cy.get('.oxd-brand-banner').find('img').should('be.visible')

        cy.get('.oxd-navbar-nav').then(nav => {
            cy.wrap(nav).find('li').eq(1).should('contain.text', 'PIM').as('pim_button')
        })

        cy.get('.oxd-topbar-body-nav').then(body_navigation => {
            cy.wrap(body_navigation).find('.oxd-topbar-body-nav-tab-item').contains('Add Employee').click()
        })

        // Unesi Ime, prezime i srednje ime
        cy.get('.orangehrm-employee-container').then(employee_container => {
            cy.wrap(employee_container).find('input[name="firstName"]').type('Test Ime')
            cy.wrap(employee_container).find('input[name="lastName"]').type('Test Prezime')
            cy.wrap(employee_container).find('input[name="middleName"]').type('Test Srednje Ime')
        })

        // Invoke dinamicki id koji se dodelju od strane aplikacije
        cy.get('.oxd-input--active').eq('3').invoke('val').as('val')
        cy.get('@val').then(($userId) => {
            userId = $userId.toString()
            console.log("User ID : ", userId)
        })


    });

});