describe('Teste de geração de token', () => {
  it('deve capturar o payload enviado', () => {
    // Intercepta a requisição POST e mostra o payload no console
    cy.intercept('POST', 'http://localhost:5260/api/tokens', (req) => {
      console.log('Payload enviado:', req.body);
    }).as('postToken');

    // Acessa o sistema
    cy.visit('http://localhost:4200');

    // Faz login
    // cy.get('input[type="text"]').type('admin');
    // cy.get('input[type="password"]').type('123123');
    // cy.contains('Fazer login').click();

    // Aguarda redirecionamento
    cy.url().should('include', '/tokens');

    // Preenche o formulário
    cy.get('input[formcontrolname="description"]').type('teste de token');
    cy.get('input[formcontrolname="expiration"]').type('2025-07-24T02:00');

    // Clica em "Cadastrar"
    cy.contains('Cadastrar').click();

    // Espera a requisição ser feita
    cy.wait('@postToken');
  });
});
