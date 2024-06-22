describe('template spec', () => {
  it('passes', () => {
    cy.visit('https://example.cypress.io');
  });
});

describe('Blog app', function() {
  beforeEach(function() {
    cy.visit('http://localhost:5173');
  });

  it('Login form is shown', function() {
    cy.contains('Login').click();
  });

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      // ...
    });

    it('fails with wrong credentials', function() {
      // ...
    });
  });

});