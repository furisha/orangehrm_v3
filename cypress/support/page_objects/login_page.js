export class LoginPage {

  login_admin() {
    
    let cookie

    cy.fixture('test_items').then((data) => {

      const testdata = data

      cy.intercept('POST', testdata.endpoints.login).as('postLogin')

      const admin_username = testdata.credentials.admin_username;
      const admin_password = testdata.credentials.admin_password;
      cy.get('input[name=username]').clear().type(admin_username)
      cy.get('input[name=password]').type(admin_password)

      cy.get('button[type=submit]').click()

      cy.getCookie('orangehrm').should('exist').then((c) => {
        cookie = c
        console.log("Cookie value is: ", cookie.value)
        // expect(cookie[0]).to.have.property('name', 'value')
      })
      
      cy.wait('@postLogin').then(xhr => {
        expect(xhr.response.statusCode).to.equal(testdata.status_code.successful)
      })

    })
  }

}

export const onLoginPage = new LoginPage()