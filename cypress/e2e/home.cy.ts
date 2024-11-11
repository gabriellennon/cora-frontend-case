describe('Home', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('Should load Login page because not authenticated', () => {
    cy.contains('Fazer Login');
  });

  context('When user is Authenticated', () => {
    beforeEach(() => {
      cy.login();
    });

    it('Should show the logout button and title page', () => {
      cy.contains('Sair');
      cy.contains('Hey There');
      cy.contains('Tenha um ótimo teste!!!');
    });

    it('Should navigate to to-do Page', () => {
      cy.contains('Hey There');
      cy.get('a[href="/todo"]').click();
      cy.url().should('include', '/todo');
      cy.contains('Weekly to-do list');
    });

    it('Should navigate to back Home Page', () => {
      cy.get('a[href="/todo"]').click();
      cy.url().should('include', '/todo');
      cy.contains('Weekly to-do list');
      cy.contains('Voltar');
      cy.get('.back-button').click();
      cy.url().should('eq', 'http://localhost:5173/');
      cy.contains('Hey There');
    });

  });
});
