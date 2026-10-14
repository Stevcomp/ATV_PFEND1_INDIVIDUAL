# Backend — DevResources Manager

API REST em Express e MySQL, organizada em rotas, controllers, services e models.

## Configuração

1. Copie `.env.example` para `.env` e ajuste os dados de acesso ao MySQL.
2. Crie o banco `dev_resources` se ainda não existir.
3. Execute `migrations/10142026_1945_usuarios_e_ferramentas.sql` no banco.
4. Instale as dependências e inicie o servidor:

```bash
npm install
npm run dev
```

A porta padrão do exemplo é `3001`. O front-end roda em `http://localhost:3005`; ajuste `FRONTEND_ORIGIN` se usar outra origem.

## Rotas

- `POST /api/usuarios` — cadastro com `nome`, `email` e `senha`.
- `POST /api/usuarios/login` — login com `email` e `senha`.
- `GET /api/ferramentas` — lista; aceita os filtros `q` e `categoria`.
- `GET /api/ferramentas/:id` — consulta por ID.
- `POST /api/ferramentas` — cadastro com `usuario_id`.
- `PUT /api/ferramentas/:id` e `DELETE /api/ferramentas/:id` — edição e exclusão.

As senhas são armazenadas com hash bcrypt. A autenticação continua simulada no front-end por `localStorage`, conforme a especificação atual.
