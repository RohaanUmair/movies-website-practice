describe('template spec', () => {
  beforeEach(() => {
    cy.visit('localhost:3000/login')
    cy.clearCookies();
  })

  // it('passes', () => {
  //   cy.visit('localhost:3000/login')
  // })

  // it('checking login form', () => {
  //   cy.visit('localhost:3000/login')

  //   cy.get('#login-text')
  //     .should('exist')
  //     .should('have.text', 'Login')

  //   cy.get('#login-email')
  //     .should('exist')

  //   cy.get('#login-pass')
  //     .should('exist')

  //   cy.get('#login-btn')
  //     .should('exist')
  //     .should('have.text', 'Login In')
  // })


  it('Submit login form', () => {
    cy.intercept('POST', '/api/login', {
      statusCode: 200,
      body: { message: 'Logged In' }
    }).as('loginAPI');


    cy.get('#login-email')
      .type('abcd@email.com')

    cy.get('#login-pass')
      .type('123123')

    cy.get('#login-btn')
      .should('have.text', 'Login In')
      .click()

    cy.wait('@loginAPI');

    cy.setCookie("user", "TestUser");
    cy.setCookie("userEmail", "abcd@email.com");
    cy.setCookie("accNames", JSON.stringify(['kids']));
    cy.setCookie("accAvatars", JSON.stringify([]));

    cy.wait(5000)

    cy.visit('localhost:3000')




    cy.intercept('GET', '/api/addProfile', {
      statusCode: 200,
      body: {
        data: {
          _id: "1234567890asdfghjkl12345678",
          username: "TestUser",
          email: "abcd@email.com",
          password: "$2b$10$OU6KkdBAHCwCLt96Z1BsOOCMakZ.xhuEgpov7Cpe4lfu5NpWoqOWu",
          accNames: ["kids"],
          avatars: [],
          __v: 0
        }
      }
    }).as('getProfilesAPI');
    cy.wait('@loginAPI');



  })


})