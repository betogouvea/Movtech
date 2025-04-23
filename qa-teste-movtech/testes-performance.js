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
const TOKEN = 'SEU_TOKEN_AQUI'; // <- Coloque o token real aqui, se necessário

export default function () {
  const url = 'http://localhost:5260/api/clients'; // Troque pelo endpoint real se necessário

  // =============================================================
  // Headers da requisição. Adicione 'Authorization' se usar token.
  // =============================================================
  const params = {
    headers: {
      'Authorization': `Bearer ${TOKEN}` // <- Descomente se a API precisar de autenticação
    }
  };

  const res = http.get(url, params);

  // Valida se:
  // ✅ Resposta tem status 200
  // ✅ Tempo de resposta foi menor que 2 segundos
  check(res, {
    'status is 200': (r) => r.status === 200,
    'response time is less than 2s': (r) => r.timings.duration < 2000,
  });
}
