describe('To-do Screen', () => {
  beforeEach(() => {
    cy.login();
  });

  it('Should load To-Do page correctly', () => {
    cy.visit('/todo');

    cy.contains('Weekly to-do list').should('be.visible');
    cy.contains('Bem-vindo ao nosso produto').should('be.visible');
  });

  it('Should search todo', () => {
    cy.visit('/todo');

    cy.get('input[id="search"]').type('Visualizar');
    cy.get('form').submit();

    cy.contains('Visualizar todas as tasks corretamente').should('be.visible');
  });

  it('Should allow done task', () => {
    cy.visit('/todo');

    cy.contains('Resolver to-do bugs').parent().contains('change to').click();

    cy.contains('Resolver to-do bugs').find('span[data-type]').should('have.attr', 'data-type', 'done');
  });

  it('Should delete task', () => {
    cy.visit('/todo');

    cy.contains('Página de login - CSS').parent().find('button#delete').should('be.visible').click();

    cy.contains('Página de login - CSS').should('not.exist');
  });
});
