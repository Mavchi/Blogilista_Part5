Cypress.Commands.add('login', ({ username, password }) => {
    cy.request('POST', 'http://localhost:3001/api/login', {
        username, password
    }).then(({ body }) => {
        localStorage.setItem('loggedBlogsPart5User', JSON.stringify(body))
        cy.visit('http://localhost:3000')
    })
})

Cypress.Commands.add('createBlog', ({ title, author, url }) => {
  cy.request({
    url: 'http://localhost:3001/api/blogs',
    method: 'POST',
    body: { title, author, url },
    headers: {
        'Authorization': `bearer ${JSON.parse(localStorage.getItem('loggedBlogsPart5User')).token}`
    }
  })

  cy.visit('http://localhost:3000')
})

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    cy.visit('http://localhost:3000/')
  })

  it('Login form is shown', function() {
    cy.get('#loginForm')
  })

  describe('Login', function() {
    beforeEach(function () {
      cy.request('POST', 'http://localhost:3001/api/testing/reset')
      const user = {
        name: 'Aleksi K',
        username: 'root',
        password: 'sekret'
    }

      cy.request('POST', 'http://localhost:3001/api/users/', user)
      cy.visit('http://localhost:3000/')
    })

    it('succeeds with correct credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('sekret')
      cy.get('#login-button').click()

      cy.contains('Aleksi K logged in')
    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('root')
      cy.get('#password').type('meh')
      cy.get('#login-button').click()

      cy.get('.error')
        .should('contain', 'wrong username or password')
        .should('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
      beforeEach(function() {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
          name: 'Aleksi K',
          username: 'root',
          password: 'sekret'
        }

        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000/')

        cy.login({ username: 'root', password: 'sekret' })
      })

      it('A blog can be created', function() {
        cy.contains('create new blog').click()
        cy.get('#title').type('Go To Statement Considered Harmful')
        cy.get('#author').type('Edsger W. Dijkstra')
        cy.get('#url').type('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
        
        cy.get('#create-blog-button').click()
        cy.contains('a new blog Go To Statement Considered Harmful by Edsger W. Dijkstra added')
        cy.get('.content-blogs')
          .should('contain', 'Go To Statement Considered Harmful')
          .should('contain', 'Edsger W. Dijkstra')
      })

      describe('Blog', function() {
        beforeEach(function() {
          cy.createBlog({
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          })
        })

        it('possible to like blog', function () {
          cy.contains('show').click()
          cy.get('.blog-likes').should('contain', '0')
          cy.contains('like').click()
          cy.get('.blog-likes').should('contain', '1')
        })

        it('user can remove blog', function () {
          cy.contains('show').click()
          cy.contains('remove').click()
          cy.get('.content-blogs')
            .should('not.contain', 'Go To Statement Considered Harmful')
            .should('not.contain', 'Edsger W. Dijkstra')
        })
      })

      describe('Multiple blogs', function() {
        beforeEach(function() {
          cy.createBlog({
              title: 'Go To Statement Considered Harmful',
              author: 'Edsger W. Dijkstra',
              url: 'https://reactpatterns.com/',
          })
          cy.createBlog({
              title: 'React patterns',
              author: 'Michael Chan',
              url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
          })
        })

        it('blogs are sorted correctly according to likes', function() {
          cy.get('.blogDiv').then(blogs => {
            cy.wrap(blogs[0]).contains('show').click()
            cy.wrap(blogs[1]).contains('show').click()

            cy.wrap(blogs[0]).should('contain', 'Go To Statement Considered Harmful')
            cy.wrap(blogs[1]).contains('like').click()
          })
          cy.get('.blogDiv').should('contain', 'React patterns')
        })
      })
  })
})