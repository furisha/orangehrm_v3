const { onLoginPage } = require("../support/page_objects/login_page")
const { usingVerifications } = require("../support/page_objects/verifications")
const { usingNavigations } = require("../support/page_objects/navigations")


describe('add_employee', () => {

  let testdata
  let employeeNumber
  let empNumber
  let userId

  before('open application', () => {
    cy.openApp()
    cy.fixture('test_items').then((data) => {
      testdata = data
    })
  })

  it('add/delete employee', () => {
    onLoginPage.login_admin()
    usingVerifications.verify_url_dashboard()
    usingNavigations.navigate_to_pim()

    cy.get('.oxd-topbar-body-nav').then(body_navigation => {
      cy.wrap(body_navigation).find('.oxd-topbar-body-nav-tab-item').contains('Add Employee').click()
    })

    cy.get('.orangehrm-employee-container').then(employee_container => {
      cy.wrap(employee_container).find('input[name="firstName"]').type(testdata.users.user_username)
      cy.wrap(employee_container).find('input[name="lastName"]').type(testdata.users.user_lastname)
      cy.wrap(employee_container).find('input[name="middleName"]').type(testdata.users.user_middlename)
    })

    // cy.get('.oxd-input--active').eq('3').invoke('val').as('val')
    // cy.get('@val').then(($userId) => {
    //   userId = $userId.toString()
    //   console.log("User ID : ", userId)
    // })

    cy.get('label').contains('Employee Id')
      .parent()
      .next()
      .find('input')
      .invoke('val').as('val')
    cy.get('@val').then(($userId) => {
      userId = $userId.toString()
      console.log("User ID : ", userId)
    })

    cy.intercept('GET', testdata.endpoints.personal_details).as('getPersonalDetails')
    cy.get('button').contains('Save').click()

    cy.get('.orangehrm-edit-employee').should('be.visible')

    cy.wait('@getPersonalDetails').then(xhr => {
      expect(xhr.response.statusCode).to.equal(testdata.status_code.successful)
      expect(xhr.response.body.data.employeeId).to.equal(userId)
      expect(xhr.response.body.data.firstName).to.equal(testdata.users.user_username)
      expect(xhr.response.body.data.lastName).to.equal(testdata.users.user_lastname)
      expect(xhr.response.body.data.middleName).to.equal('tsdasd')

      empNumber = xhr.response.body.data.empNumber
      console.log("empNumber is:", empNumber)
      employeeNumber = empNumber.toString()
      console.log("employeeNumber is:", employeeNumber)

      cy.url().should('include', testdata.endpoints.employee_number + employeeNumber)

      usingNavigations.navigate_to_pim()

      cy.get('.oxd-input--active').eq(1).type(userId)

      cy.intercept('DELETE', testdata.endpoints.employees).as('deleteEmployee')
      cy.get('button').contains('Search').click()

      cy.get('[role="rowgroup"]').should('be.visible').then( table => {
        cy.wrap(table).find('[role="cell"]').eq(1).should('contain.text', userId)
        cy.wrap(table).find('.bi-trash').eq(0).click()
      })
      cy.get('.orangehrm-dialog-popup').find('.oxd-button--label-danger')
        .should('contain.text', 'Yes, Delete').click()

      cy.wait('@deleteEmployee').then(xhr => {
        expect(xhr.response.statusCode).to.equal(testdata.status_code.successful)
      })

    })

    cy.get('.oxd-userdropdown-name').click()
    cy.get('.oxd-userdropdown-link').contains('Logout').click()

    usingVerifications.verify_url_auth_login()

    // TASK: ADD PERSONAL DETAILS AND ASSERT In XHR
    // cy.intercept('GET', '**/personal-details*').as('getPersonalDetails')
    // cy.get('.orangehrm-form-hint').should('contain.text', "* Required")
    //   .next().should('contain.text', "Save").click()

  })

})