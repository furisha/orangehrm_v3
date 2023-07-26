export class Verifications {

  verify_url_auth_login() {
    cy.fixture('test_items').then((data) => {
      const testdata = data

      cy.url().should('contain', testdata.urls.auth_login)
    })
  }

  verify_url_dashboard() {
    cy.fixture('test_items').then((data) => {
      const testdata = data
      cy.url().should('contain', testdata.urls.dashboard)
    })
  }
}

export const usingVerifications = new Verifications()
