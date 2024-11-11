describe('IBanking Screen', () => {
  beforeEach(() => {
    cy.login();
  });

  beforeEach(() => {
    cy.intercept('GET', '/list', {
      statusCode: 200,
      body: {
        results: [
          {
            date: '2023-01-01',
            items: [
              {
                "id": "abc123def456ghi789",
                "description": "Compra de produtos eletrônicos",
                "label": "Compra aprovada",
                "entry": "DEBIT",
                "amount": 150000,
                "name": "João da Silva",
                "dateEvent": "2024-02-01T08:15:17Z",
                "status": "COMPLETED"
              }
            ],
          },
        ],
      },
    }).as('getTransactions');
  });

  it('Should load and render transactions', () => {
    cy.visit('/ibanking');

    cy.wait('@getTransactions');

    cy.get('.loading').should('not.exist');

    cy.get('.transaction-group').should('exist');
    cy.contains('saldo do dia R$ 1.500,00');
  });

  it('Should rende error message in screen', () => {
    cy.intercept('GET', '/list', {
      statusCode: 500,
      body: { error: 'Erro interno do servidor' },
    }).as('getTransactionsError');

    cy.visit('/ibanking');

    cy.wait('@getTransactionsError');

    cy.contains('Ops, algo deu errado.');
    cy.contains('Tentar novamente');
  });
});
