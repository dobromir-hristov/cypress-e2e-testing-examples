/// <reference types="cypress" />
describe('Shows how to test a basic form', () => {
  it('fills in the form', () => {
    cy.server()
    // Stub the POST request to /articles and return a 403
    cy.route({
      method: 'POST',
      url: 'articles*',
      status: '403',
      response: 'Invalid Cover image'
    })

    // visit the page
    cy.visit('/add-article')

    // submit without any data
    cy.getByTestId('submit').click()

    // check if fields have errors and type into them
    cy.getByTestId('title').isInvalid('Title is required')
      .type('Vue enterprise boilerplate')

    cy.getByTestId('author').isInvalid('Author is required')
      .type('Chris Fritz')

    cy.getByTestId('image')
      .type('Vue enterprise boilerplate')
      .isInvalid('Cover image must be a valid url')
      .clear()
      .type('https://cdn-images-1.medium.com/max/2000/1*PHmNXbvOfg5AHiMWWuaRXg.jpeg')

    cy.getByTestId('rating')
      .invoke('val', 25)
      .trigger('change')

    cy.getByTestId('body')
      .type('Lorem Ipsum .... whatever')

    cy.getByTestId('submit').click()

    cy.isPopupVisible('error', 'Invalid Cover image', true)

    cy.route('POST', 'articles').as('postArticle') // unstub

    cy.getByTestId('submit').click()

    cy.isPopupVisible('info', 'Vue enterprise boilerplate saved successfully.', true)

    cy.wait('@postArticle').its('responseBody').then((body) => {
      cy.url().should('contain', `articles/${body.id}`)

      cy.getByTestId('articleTitle').should('contain', body.title)
    })
  })
})
