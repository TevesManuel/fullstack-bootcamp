describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});

const USER = {
  name: 'Manuel Teves',
  user: 'manuel_teves',
  pass: 'abc',
}
const ANOTHER_USER = {
  name: 'Luz Arancibia',
  user: 'luz_arancibia',
  pass: 'cba',
}
const BLOG = {
  title: 'Title of the default test blog',
  url: "https://www.youtube.com/"
}
const ANOTHER_BLOG = {
  title: 'Title of the another default test blog',
  url: "https://www.anotherwebsite.com/"
}

describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3000/api/testing/reset');
    const user = {
      name: USER.name,
      username: USER.user,
      password: USER.pass
    };
    cy.request('POST', 'http://localhost:3000/api/users/', user);
    const another_user = {
      name: ANOTHER_USER.name,
      username: ANOTHER_USER.user,
      password: ANOTHER_USER.pass
    };
    cy.request('POST', 'http://localhost:3000/api/users/', another_user); 
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function() {
    cy.contains('Login').click();
  });

  const loginFn = (userObj) => {
    cy.contains('Login').click();
    cy.get('input:first').type(userObj.user);
    cy.get('input:last').type(userObj.pass);
    cy.contains('login').click();
    cy.contains(`Hello ${userObj.name}`);
  } 

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      loginFn(USER);
    });

    it('fails with wrong credentials', function() {      
      cy.contains('Login').click();
      cy.get('input:first').type(USER.user);
      cy.get('input:last').type('wrong password');
      cy.contains('login').click();
      cy.contains("User or password are invalid.");
    });
  });

  describe('When logged in', function() {
    describe('When logged in', function() {
      
      beforeEach(function() {
        loginFn(USER);
      });

      const createBlog = (blogObj) => 
      {
        cy.get('#newBlogButton').click();
        cy.get('input:first').type(blogObj.title);
        cy.get('input:last').type(blogObj.url);
        cy.contains('Submit').click();
        cy.contains('Blog uploaded');
      }

      const likeBlog = (blogObj, numLikes) =>
      {
        cy.contains(blogObj.title).click();
        for(let i = 0; i < numLikes; i++)
        {
          cy.get('.likeButton').click();
        }
        cy.get('.bottomDivBlogInfo > h2').contains(numLikes);
      }

      it('A new blog can be created', function() {
        createBlog(BLOG);
      });

      it('User can be like a blog', function() {
        createBlog(BLOG);
        likeBlog(BLOG, 1);
      });

      it('Only property user can be remove a blog', function() {
        createBlog(BLOG);
        cy.contains(BLOG.title).click();
        cy.get('a').should('have.class', 'auth');
        cy.document().then((doc) => {
          cy.wrap(doc.body).click(10, 10);
        });
        cy.get('#stateLoginTouchable').click();
        cy.get('[style="position: fixed; top: 0px; left: 0px; width: 100%; height: 100%; background-color: rgba(0, 0, 0, 0.5); display: flex; justify-content: center; align-items: center; z-index: 99;"] > div > button').click();
        loginFn(ANOTHER_USER);
        cy.contains(BLOG.title).click();
        cy.get('a').should('have.class', 'unauth');
      });

      it('Correct order of blogs', function() {
        createBlog(BLOG);
        likeBlog(BLOG, 1);
        cy.document().then((doc) => {
          cy.wrap(doc.body).click(10, 10);
        });
        createBlog(ANOTHER_BLOG);
        likeBlog(ANOTHER_BLOG, 10);
        cy.document().then((doc) => {
          cy.wrap(doc.body).click(10, 10);
        });
        cy.get('section').within(() => {
          cy.get('aside').first().then(($firstAside) => {
            cy.wrap($firstAside).click();
            cy.contains(ANOTHER_BLOG.title);
          });
        });
      });

    });
  });

});