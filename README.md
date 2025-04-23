# 🧪 Projeto de QA – Teste Técnico Movtech

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Tested With](https://img.shields.io/badge/tested%20with-Cypress-brightgreen.svg)](https://www.cypress.io/)
[![Performance Tool](https://img.shields.io/badge/performance-K6-lightgrey.svg)](https://k6.io/)

## 📌 Visão Geral

Este repositório contém os testes criados para validar a **qualidade** e o **funcionamento da aplicação da Movtech**. A proposta é garantir que a aplicação esteja estável e funcional através de testes de:

- ✅ API
- ⚙️ Carga
- 🚀 Performance

> O projeto é voltado para a equipe de desenvolvimento e possui documentação clara para facilitar o uso mesmo sem um QA dedicado no time.

---

## 🛠️ Ferramentas Utilizadas

| Ferramenta | Finalidade |
|------------|------------|
| [Cypress](https://www.cypress.io/) | Testes E2E automatizados |
| [K6](https://k6.io/) | Testes de carga e performance |
| [Postman](https://www.postman.com/) | Testes manuais e explorações de API |

---

## 📁 Estrutura de Testes

### 📌 1. Testes de API

Validação dos endpoints principais:

- `POST /api/clients` – Criação de cliente  
- `GET /api/clients/{id}` – Consulta por ID  
- `DELETE /api/clients/{id}` – Exclusão de cliente  
- Validação de erros (dados inválidos, campos obrigatórios etc.)

#### 📝 Exemplo de Gherkin

```gherkin
Feature: Criação de Cliente via API

  Scenario: Criar Cliente com Dados Válidos
    Given Eu envio uma requisição POST para "/api/clients" com os seguintes dados:
      | name        | email                   | phone        | address                        |
      | Beto Gouvea  | Beto.qa@example.com  | 11999991234  | Rua das Flores, Jaraguá do Sul, SC  |
    When A requisição é processada
    Then Eu recebo um código de resposta 201
    And A resposta contém os dados do cliente criado
```

Outros cenários de teste: https://whimsical.com/projeto-de-testes-HTVdVBDQaYvgPrPXFpzXNx

---

### ⚙️ 2. Testes de Carga

Testes para verificar a estabilidade da API com múltiplas requisições simultâneas.

**Cenário:**  
- Enviar **100 requisições** simultâneas para criação de clientes via API.

---

### 🚀 3. Testes de Performance

Testes para avaliar o tempo de resposta em situações de alto volume de dados.

**Cenário:**  
- Consulta de todos os clientes com **1000 registros**, garantindo resposta em **menos de 2 segundos**.

---

## ▶️ Como Rodar os Testes

### 🔧 Cypress

```bash
npm install cypress --save-dev
npx cypress open
```

- Testes localizados em: `GitHub/Movitech/qa-teste-movtech/cypress/e2e/newtoken.cy.js`

---

### 🔧 K6 – Testes de Carga

```bash
npm install -g k6
k6 run GitHub/Movitech/qa-teste-movtech/testes-carga.js
```

---

### 🔧 K6 – Testes de Performance

```bash
k6 run /GitHub/Movitech/qa-teste-movtech/testes-performance.js
```

---

## ✅ Conclusão

Este repositório oferece uma base sólida e acessível para garantir a qualidade do sistema da Movitech, utilizando ferramentas modernas e cenários práticos. Ideal para ser utilizado por devs, PMs e analistas mesmo sem um QA dedicado na equipe.
