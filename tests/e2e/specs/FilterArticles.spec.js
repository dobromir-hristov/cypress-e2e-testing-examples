describe('FilterArticles', () => {
  it('filters articles', () => {
    cy.server()
    cy.route('GET', '/articles/*').as('fetchArticle')
    cy.visit('/')

    cy.getByTestId('articleSearchInput').type('School{enter}')
    cy.onRoute('articleList')
    cy.contains('VueSchool')
      .click()

    cy.onRoute('article')
  })
})
