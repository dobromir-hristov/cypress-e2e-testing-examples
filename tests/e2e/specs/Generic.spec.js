/// <reference types="cypress" />
describe('Generic Cypress assertions', () => {
  /**
   * Here we show simple assertions against the dom
   */
  it('Visits the Home page', () => {
    // Visit the URL
    cy.visit('/')
    // No need to wait for anything
    cy.contains('Showcase e2e tests with Vue and Cypress')

    /* use jQuery like api */
    cy.get('[data-testid="vueLogo"]')
      .should('be.visible')
      .should('have.attr', 'alt', 'Vue logo')

    /* Custom command */
    cy.getByTestId('vueLogo')
    /* !!! This is a prime example of partial assertion. Unlike other assertions, have.attr fetches the attribute and returns it
     * for the next chain command. This can be quite confusing until gotten right. */
      .should('have.attr', 'src')
      // we use contain to check if the src has the word logo.
      .should('contain', 'logo')

    // use jQuery api again
    cy.get('#nav > a')
      .should('have.length', 3)
      .filter('.router-link-exact-active')
      .should('have.attr', 'href', '/') // by passing a third parameter we assert, not fetch, so have.attr does not augment the chain
      // "and" is alias to "should"
      .and('contain', 'Home')
      .parent().children().eq(1).click()

    /* Check if we are on the right URL */
    cy.url()
      .should('contain', '/articles')

    cy.get('#nav > a')
      .filter('.router-link-exact-active')
      .should('have.attr', 'href', '/articles')
      .log('Log random debug data') // cannot be chained as it augments the chain
  })
})
