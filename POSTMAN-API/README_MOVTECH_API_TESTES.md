
# ✅ Testes de API - Projeto MOVTECH

Este repositório contém uma coleção de testes de API desenvolvida com Postman para o projeto técnico da MOVTECH.

---

## 📦 Coleção Postman

**Nome da coleção:** `Movtech API Testes`

### Inclui os seguintes grupos de testes:

#### 📁 Clientes
- Criar cliente (`POST /clients`)
- Listar clientes com paginação (`GET /clients?page=1&pageSize=10`)
- Filtrar clientes por nome (`GET /clients?name=Beto`)
- Excluir cliente (`DELETE /clients/1`)

#### 📁 Pedidos
- Criar pedido (`POST /orders`)
- Atualizar status do pedido (`PATCH /orders/{id}/status`)
- Filtrar pedidos por status (`GET /orders?status=PENDING`)
- Paginar pedidos (`GET /orders?page=1&pageSize=5`)
- Excluir pedido (`DELETE /orders/1`)

---

## 🔐 Autenticação

Todas as rotas exigem autenticação com **Bearer Token**.

- Gere o token através do painel: `http://localhost:4200`
- No Postman, vá até a coleção > aba **Variables** e defina:

```
token = Bearer SEU_TOKEN_AQUI
```

---

## ▶️ Como usar

1. Abra o Postman
2. Clique em **Import > Upload Files**
3. Selecione o arquivo `movtech-api-testes-completa.postman_collection.json`
4. Importe e configure o token em **Variables**
5. Execute os testes desejados

---

## 🧪 Testes Automatizados

Cada requisição tem scripts de teste como:

```js
pm.test("Status 200 - Cliente criado", function () {
    pm.response.to.have.status(200);
});
```

---

## ℹ️ Observações

- IDs fixos como `/clients/1` devem ser substituídos manualmente ou dinamicamente via script
- O DELETE falha se o cliente ou pedido não existir no momento da execução

---

## 👨‍💻 Desenvolvido para

Desafio técnico de QA para o projeto MOVTECH, com foco em testes simples, claros e executáveis por qualquer membro da equipe.

