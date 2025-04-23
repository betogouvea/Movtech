
# ✅ Testes de API - MOVTECH 

Este documento apresenta os cenários de teste da API da MOVTECH descritos em linguagem Gherkin, ideal para automação com ferramentas como **Cucumber**, **Robot Framework** ou para documentação clara e legível para o time.

---

## 📁 Feature: Gerenciar clientes na API

```gherkin
Feature: Gerenciar clientes na API

  Background:
    Given que possuo um token de acesso válido

  Scenario: Cadastrar um novo cliente
    When envio uma requisição POST para "http://localhost:5260/api/clients" com um corpo JSON contendo nome, email, telefone e endereço
    Then a API deve responder com status 200
    And o corpo da resposta deve conter o nome do cliente

  Scenario: Consultar todos os clientes com paginação
    When envio uma requisição GET para "http://localhost:5260/api/clients?page=1&pageSize=10"
    Then a API deve responder com status 200
    And a resposta deve conter uma lista de clientes

  Scenario: Filtrar clientes por nome
    When envio uma requisição GET para "http://localhost:5260/api/clients?name=João"
    Then a API deve responder com status 200
    And a resposta deve conter ao menos um cliente com nome "João"
```

---

## 📁 Feature: Gerenciar pedidos na API

```gherkin
Feature: Gerenciar pedidos na API

  Background:
    Given que possuo um token de acesso válido
    And já existe um cliente com ID válido
    And já existe um produto com ID válido

  Scenario: Cadastrar um novo pedido
    When envio uma requisição POST para "http://localhost:5260/api/orders" com clientId e uma lista de itens contendo productId, quantity e price
    Then a API deve responder com status 201
    And a resposta deve conter os dados do pedido criado

  Scenario: Atualizar o status de um pedido
    Given que já existe um pedido com ID 5
    When envio uma requisição PATCH para "http://localhost:5260/api/orders/5/status" com status "SHIPPED"
    Then a API deve responder com status 200
    And o status do pedido deve ser atualizado para "SHIPPED"

  Scenario: Filtrar pedidos por status
    When envio uma requisição GET para "http://localhost:5260/api/orders?status=PENDING"
    Then a API deve responder com status 200
    And todos os pedidos da resposta devem ter status "PENDING"

  Scenario: Paginar pedidos
    When envio uma requisição GET para "http://localhost:5260/api/orders?page=1&pageSize=5"
    Then a API deve responder com status 200
    And a resposta deve conter no máximo 5 pedidos
```

---

## 📝 Observações

- Os testes assumem que a API está rodando localmente em `http://localhost:5260`
- O token de autenticação deve ser gerado previamente e incluído nos headers
- O formato das respostas deve seguir o padrão JSON
- Testes de ID fixo como `orders/5` devem ser adaptados para seu ambiente real

---



