// cypress/support/commands.ts
/// <reference types="./commands" />

Cypress.Commands.add('login', (cpf = '35819357833', password = '123456') => {
  cy.intercept('POST', '/auth', {
    statusCode: 200,
    body: {
      user: {
        cpf: cpf,
        name: 'João Doe',
      },
      token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
    },
  }).as('loginRequest');

  cy.visit('/login');

  cy.get('input[id="cpf"]').type(String(cpf));
  cy.get('input[id="password"]').type(password);
  cy.get('button[type="submit"]').click();

  cy.wait('@loginRequest');

  cy.window().then((win) => {
    const storedData = win.localStorage.getItem('@Cora:auth');
    expect(storedData).to.not.be.null;
    if (storedData) {
      const { token } = JSON.parse(storedData);
      expect(token).to.exist;
    }
  });
});
