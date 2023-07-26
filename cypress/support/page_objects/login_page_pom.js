export class LoginPage {

  login_admin() {
  
    cy.fixture('test_items').then(data => {
      const testdata = data
            const admin_username = testdata.credentials.admin_username;
            const admin_password = testdata.credentials.admin_password;
            cy.get('input[name=username]').clear().type(admin_username)
            cy.get('input[name=password]').type(admin_password)
            cy.get('button[type=submit]').click()
    })
  }
}

export const onLoginPage = new LoginPage()