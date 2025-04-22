import http from 'k6/http';
import { check } from 'k6';

// =============================================================
// CONFIGURAÇÃO DE CARGA - 3 etapas de simulação:
// 1. Sobe de 0 até 20 usuários em 5 segundos
// 2. Mantém 100 usuários simultâneos por 10 segundos
// 3. Reduz a carga até 0 novamente
// =============================================================
export let options = {
  stages: [
    { duration: '5s', target: 20 },
    { duration: '10s', target: 100 },
    { duration: '5s', target: 0 },
  ],
};

// =============================================================
// 🔐 Como a API exigige autenticação via token, insira seu token abaixo.
// Caso contrário, ignore essa parte.
// =============================================================
const TOKEN = 'SEU_TOKEN_AQUI'; // <- Colocar o token gerado aqui!

export default function () {
  const url = 'https://jsonplaceholder.typicode.com/posts'; // Troque para sua API real se estiver rodando

  const payload = JSON.stringify({
    name: '01',
    email: 'beto.gouvea@example.com',
    phone: '11999991234',
    address: {
      street: 'Rua das Flores',
      city: 'Jaraguá do Sul',
      state: 'SC',
      postalCode: '89250-000',
      number: '100'
    }
  });

  // =============================================================
  // Headers da requisição. Adicione 'Authorization' se usar token.
  // =============================================================
  const params = {
    headers: {
      'Content-Type': 'application/json',
      // 'Authorization': `Bearer ${TOKEN}` // <- Descomente se a API precisar de autenticação
    }
  };

  const res = http.post(url, payload, params);

  // Valida se a resposta da API retornou status 201 (Created)
  check(res, {
    'status is 201': (r) => r.status === 201
  });
}
