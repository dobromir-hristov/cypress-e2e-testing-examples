/// <reference types="cypress" />
const clickNext = () => cy.getByTestId('pageNext').click()
const clickPrev = () => cy.getByTestId('pagePrev').click()

const onPage = (number) => cy.getByTestId('paginationCurrentPage').should('contain', number)

describe('Showcases more advanced examples', () => {
  // BeforeEach is called before each context or it
  beforeEach(() => {
    cy.server()
    cy.route('articles*').as('fetchArticles')
  })
  context('Test the list', () => {
    it('loads a list of articles', () => {
      // load page
      cy.visit('/articles')
      // TODO: enable
      cy.wait('@fetchArticles').its('responseBody').as('articlesResponse') // <========= 1. enable this after showing it fails
      // check article is there
      cy.get('.ArticleList')
        .children()
        .should('have.length', 2)

      // click next with function
      clickNext()
      // This does not work as it gets the data from the first response.
      // We need to await the first one
      // alias the response of the fetchArticles for later
      cy.wait('@fetchArticles').its('responseBody').as('articlesResponse') // <=========== 2. awaits the first request, not the second

      onPage(2)

      cy.get('@articlesResponse').then((articles) => {
        cy.contains(articles[0].title)
        cy.contains(articles[1].title)
      })
    })

    it('spies on the list of articles and stubs it', () => {
      cy.visit('/articles')
      // await
      cy.wait('@fetchArticles').its('responseBody').then((response) => {
        expect(response[0]).to.have.property('title', 'VueMastery')
        // assert if any of the elements contains the first item
        cy.getByTestId('articleListItemAuthor').should('contain', response[0].author)
        cy.getByTestId('articleListItemImage').first()
          .should('have.attr', 'src', response[0].image)
      })
      // stub
      cy.route({
        method: 'GET',
        url: 'articles*',
        response: [{ id: 999, title: 'StubbedArticle', author: 'John Doe' }],
        headers: {
          'x-total-count': '10'
        }
      }).as('fetchArticles')
      // click next
      clickNext()
      cy.wait('@fetchArticles')
      cy.getByTestId('articleListItemAuthor').should('contain', 'John Doe')
      // unstub
      cy.route('articles*').as('fetchArticles') // <====== unstubs the stubbed request
      // await
      clickNext()
      /* Showcase Nesting to share data */
      cy.wait('@fetchArticles').then(({ responseBody }) => {
        cy.contains('Laracasts')
        onPage(3)

        cy.get('.ArticleListItem').first().click()
        /** We can rely on the response we had from before
         * OR
         * We can await for the new request so we are sure we have the right response
         * ! We dont need to await anything, it just works.
         */
        cy.onRoute('article')
        cy.contains(responseBody[0].title)
        cy.getByTestId('articleImage').should('have.attr', 'src', responseBody[0].image)
      })
    })

    it('uses a fixtures as response', () => {
      // stub the request
      cy.route('GET', 'articles*', 'fixture:articles.json').as('fetchArticles')
      cy.visit('/articles')

      cy.contains('Dobromir Hristov')
      cy.contains('e2e testing with Cypress.io')
    })
  })

  context('Test the single page', () => {
    it('allows pre-fetching the data to allow going to a page directly', () => {
      cy.route('articles/*').as('fetchArticle')
      // Spy on article route
      let firstItem = {}
      cy.request({
        // we can use the ENV from plugins/index.js
        url: Cypress.env('API_BASE_URL') + '/articles'
      }).then((response) => {
        firstItem = response.body[0]
        return firstItem
      }).as('fetchArticles')
      // This does not work
      // cy.visit('/articles/' + firstItem.id) // <================== Does not work like that

      /**
       * This however works. We await for that request and when done, we use the stored data.
       * We can also return the data and use it in the then callback.
       * We can use cy.get with response aliases
       */
      cy.get('@fetchArticles').then((response) => {
        cy.log(response) // should be first item
        cy.visit('/articles/' + firstItem.id)
        cy.getByTestId('articleImage')
          .should('be.visible')
          .should('have.attr', 'src', firstItem.image)

        cy.getByTestId('articleTitle')
          .should('contain', firstItem.title)

        cy.getByTestId('articleAuthor')
          .should('contain', firstItem.author)

        cy.getByTestId('articleRating')
          .should('contain', firstItem.rating)

        cy.getByTestId('articleBody')
          .should('contain', firstItem.body)
      })
    })
  })
})
