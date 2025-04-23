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
// 🔐 Se a API exigir autenticação via token, insira seu token abaixo.
// Caso contrário, ignore essa parte.
// =============================================================
const TOKEN = 'SEU_TOKEN_AQUI'; // <- Coloque o token real aqui, se necessário

export default function () {
  const url = 'http://localhost:5260/api/clients'; // porta do meu local

  const payload = JSON.stringify({
    name: '01',
    email: 'beto.qa@teste.com',
    phone: '47996889933',
    address: {
      street: 'Rua Teste',
      city: 'sao paulo',
      state: 'SP',
      postalCode: '01000-000',
      number: '123'
    }
  });

  // =============================================================
  // Headers da requisição. Adicione 'Authorization' se usar token.
  // =============================================================
  const params = {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${TOKEN}` // <- Descomente se a API precisar de autenticação
    }
  };

  const res = http.post(url, payload, params);

  // Valida se a resposta da API retornou status 200 (Created)
  check(res, {
    'status is 200': (r) => r.status === 200
  });
}
