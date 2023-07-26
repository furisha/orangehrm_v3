export class Navigations {

  open_navbar() {
    cy.get('.oxd-navbar-nav').then(menu => {
      cy.wrap(menu).find('.oxd-icon-button i').invoke('attr', 'class').then(attr => {
        if (attr.includes('right')) {
          cy.wrap(menu).find('.oxd-icon-button').click()
          console.log(attr)
        } else {
          console.log(attr)
        }
      })
    })
  }

  close_navbar() {
    cy.get('.oxd-navbar-nav').then(menu => {
      cy.wrap(menu).find('.oxd-icon-button i').invoke('attr', 'class').then(attr => {
        if (attr.includes('left')) {
          cy.wrap(menu).find('.oxd-icon-button').click()
          console.log(attr)
        } else {
          console.log(attr)
        }
      })
    })
  }

  navigate_to_pim() {
    cy.fixture('test_items').then((data) => {
      const testdata = data

      cy.intercept('GET', testdata.endpoints.messages).as('getMessages')
      cy.intercept('GET', testdata.endpoints.employees).as('getEmployees')

      cy.get('.oxd-navbar-nav').then(nav => {
        cy.wrap(nav).find('li').eq(1).should('contain.text', 'PIM').as('pim_button')
      })

      cy.get('@pim_button').click()

      cy.wait('@getMessages').then(xhr => {
        expect(xhr.response.statusCode)
          .to.equal(testdata.status_code.not_modified)
      })

      cy.get('@getEmployees').then(console.log)

      cy.wait('@getEmployees').then(xhr => {
        expect(xhr.response.statusCode)
          .to.equal(testdata.status_code.successful)
        expect(xhr.response.statusMessage)
          .to.equal(testdata.status_code.successful_message)
      })

    })
  }
}

export const usingNavigations = new Navigations()
