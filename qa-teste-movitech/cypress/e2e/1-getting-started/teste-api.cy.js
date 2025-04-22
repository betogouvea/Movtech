describe('Testes de API para Clientes', () => {
  // ==========================================================
  // 🌐 Configurações gerais
  // ==========================================================
  const baseUrl = 'https://jsonplaceholder.typicode.com/posts'; // 🔁 Altere aqui o endpoint para o localhost Movitech
  const authToken = 'SEU_TOKEN_AQUI'; // 🔐 Substitua pelo seu token de autenticação

  const clienteValido = {
    name: 'Beto Gouvea',
    email: 'beto.gouvea@example.com',
    phone: '11999991234',
    address: {
      street: 'Rua das Flores',
      city: 'Jaraguá do Sul',
      state: 'SC',
      postalCode: '89250-000',
      number: '100'
    }
  };

  // ==========================================================
  // 🧪 Teste: Criar cliente
  // ==========================================================
  it('Deve criar um novo cliente com dados válidos (POST)', () => {
    cy.request({
      method: 'POST',
      url: baseUrl,
      headers: {
        Authorization: authToken,
      },
      body: clienteValido,
    }).then((response) => {
      expect(response.status).to.eq(201);
      expect(response.body.name).to.eq(clienteValido.name);
      expect(response.body.email).to.eq(clienteValido.email);
    });
  });

  // ==========================================================
  // 🧪 Teste: Consultar cliente (GET)
  // ==========================================================
  it('Deve consultar um cliente existente (GET)', () => {
    cy.request({
      method: 'GET',
      url: `${baseUrl}/1`, // Altere o ID conforme necessário
      headers: {
        Authorization: authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(200);
      expect(response.body).to.have.property('id', 1);
      expect(response.body).to.have.property('name');
    });
  });

  // ==========================================================
  // 🧪 Teste: Excluir cliente (DELETE)
  // ==========================================================
  it('Deve excluir um cliente existente (DELETE)', () => {
    cy.request({
      method: 'DELETE',
      url: `${baseUrl}/1`, // Altere o ID conforme necessário
      headers: {
        Authorization: authToken,
      },
    }).then((response) => {
      expect(response.status).to.eq(204);
    });
  });
});
