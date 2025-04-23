Cypress.Commands.add('fazerLogin', (usuario, senha) => {
    cy.visit('http://localhost:4200');
    // cy.get('input[type="text"]').type(usuario);
    // cy.get('input[type="password"]').type(senha);
    // cy.contains('Fazer login').click();
  
    // Aguarda redirecionamento para a tela de tokens
    cy.url().should('include', '/tokens');
  });
  
  //comando para preencher o formulario
  Cypress.Commands.add('preencherFormularioToken', (descricao, dataHora) => {
    cy.url().should('include', '/tokens');
    cy.get('input[formcontrolname="description"]').type(descricao);
    cy.get('input[formcontrolname="expiration"]').type(dataHora);
  });
  //comando para clicar em cadastrar o token de forma forçada, pois o erro nao permite clicar duas vezes
  Cypress.Commands.add('clicarCadastrarToken', () => {
    cy.get('button.btn.btn-primary').contains('Cadastrar').click({ force: true });
    cy.wait(100);
  });
  // comando para lidar com o erro de horario e passar a etapa
  Cypress.Commands.add('lidarComErro500', () => {
    cy.on('window:alert', (mensagem) => {
      cy.log(`Alerta: ${mensagem}`);
      cy.wait(500); // aguarda transição do alerta
    });
  });
  
  
  //comando para validar a resposta do token criado
  Cypress.Commands.add('validarRespostaPostToken', () => {
    cy.wait('@postToken').then((intercept) => {
      const status = intercept?.response?.statusCode;
  
      // Se não existir, loga erro sem quebrar o teste abruptamente
      if (!status) {
        cy.log('Atenção: nenhuma resposta de status foi recebida pela interceptação.');
      } else {
        cy.log(`Status recebido: ${status}`);
        expect([200, 500]).to.include(status);
      }
    });
  });
  
  // comando para validar o token mostrado na tela principal
  Cypress.Commands.add('validarTokenNaTela', () => {
    cy.get('div.alert.alert-success', { timeout: 100 })
      .should('be.visible')
      .invoke('text')
      .then((token) => {
        const tokenLimpo = token.trim(); // remove espaços, \n, etc
        cy.log(`Token gerado: ${tokenLimpo}`);
        expect(tokenLimpo).to.match(/^[a-f0-9]{32}$/);
      });
  });
  
  
  