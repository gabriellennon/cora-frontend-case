/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Realiza login simulando uma requisição mockada.
     * @param cpf - CPF do usuário (default: '35819357833').
     * @param password - Senha do usuário (default: '123456').
     */
    login(cpf?: string, password?: string): Chainable<void>;
  }
}
