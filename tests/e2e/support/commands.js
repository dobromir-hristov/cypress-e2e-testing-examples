// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

/**
 * Fetches elements by their data-testid attribute
 * @memberOf Cypress.Chainable#
 * @name getByTestId
 * @param {string} query
 * @function
 * @returns Cypress.Chainable
 */
Cypress.Commands.add('getByTestId', (query) => cy.get(`[data-testid="${query}"]`))

/**
 * Checks if the provided route name is the same as the current route in Vue Router
 * @memberOf Cypress.Chainable#
 * @name onRoute
 * @param {string} routeName
 * @function
 */
Cypress.Commands.add('onRoute', (routeName) => {
  // cy.window().its('$app.$route.name').should('eq', routeName)

  /* We can use Chai assertions inside callbacks */
  cy.window().its('$app.$route').then((route) => {
    expect(route.name).to.eq(routeName)
  })
})

/**
 * Checks if the provided element contains validation errors
 * @memberOf Cypress.Chainable#
 * @name isInvalid
 * @param {string} [options] - Error to check for
 * @function
 */
Cypress.Commands.add('isInvalid', { prevSubject: 'element' }, (subject, options) => {
  const el = cy.wrap(subject)
  el.should('have.class', 'has-errors')
  const errors = el.parent().siblings('.FormGroup__errors')

  errors.should('exist')

  if (options) {
    errors
      .contains(options)
  }
  // You cannot return, you have to refetch the passed subject again without returning....
  cy.wrap(subject)
})

/**
 * Checks if an error popup is visible
 * @memberOf Cypress.Chainable#
 * @name isPopupVisible
 * @param {string} [type] - Type of popup
 * @param {string} [text] - Error text to find in alert
 * @param {boolean} [close] - Error text to find in alert
 * @function
 */
Cypress.Commands.add('isPopupVisible', (type, text = '', close) => {
  cy.get('.swal2-modal')
    .should('be.visible')
    .should('contain', text)
    .within((obj) => {
      if (type) {
        cy.get(`.swal2-${type}`)
      }
      if (close) {
        cy.get('.swal2-confirm').click()
      }
    })
})
