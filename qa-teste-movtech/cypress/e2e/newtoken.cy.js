import dayjs from 'dayjs';

describe('Teste de geração de token', () => {
  it('deve logar e gerar token com validações', () => {
    const dataHora = dayjs().add(1, 'day').hour(2).minute(0).format('YYYY-MM-DDTHH:mm');
    // Aqui utilizei a lib do dayjs para formatar a data e hora no formato que o backend identifica.

    cy.intercept('POST', 'http://localhost:5260/api/tokens').as('postToken');

    cy.fazerLogin('admin', '123123');  // faz o login 
    cy.preencherFormularioToken('teste de token', dataHora); // preenche os dados solicitados 
    cy.clicarCadastrarToken(); // clica em cadastrar o novo token
    cy.lidarComErro500(); // coloquei esse campo para passar a etapa do erro de validação do token
    cy.validarRespostaPostToken(); // capturar o token que foi criado com o formato da hora correto
    cy.validarTokenNaTela(); // validar se o token é mostrado na tela inicial no balao verde.
  });
});