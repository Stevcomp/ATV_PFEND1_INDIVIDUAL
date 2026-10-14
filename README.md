# DevResources Manager

Catálogo colaborativo de ferramentas, conversores e utilitários para desenvolvedores. O projeto é dividido em um front-end Next.js e uma API REST em Express com banco de dados MySQL.

## Funcionalidades

- Catálogo público de ferramentas com busca por texto e filtro por categoria.
- Acesso ao site externo de cada ferramenta.
- Cadastro e login de usuários.
- Cadastro, edição e exclusão de ferramentas.
- Exibição das ações de edição e exclusão somente para quem cadastrou a ferramenta.
- Interface responsiva feita com CSS.

## Tecnologias

- Next.js com App Router e React.
- CSS próprio, sem framework de interface.
- Node.js, Express e MySQL.
- `bcryptjs` para armazenar senhas com hash.

## Estrutura

```text
backend/
  config/         configuração do ambiente e conexão MySQL
  controllers/    tratamento das requisições
  migrations/     SQL para criar as tabelas
  models/         validação dos dados e consultas SQL
  routes/         rotas de usuários e ferramentas
  services/       regras de cadastro, login e ferramentas
  server.js       inicialização da API

frontend/src/
  app/            páginas, layout e CSS global
  components/     Header, CardFerramenta e FormFerramenta
  services/       chamadas à API e leitura do usuário local
```

## Banco de dados

O banco usado no exemplo é `dev_resources`. Crie-o no MySQL se ainda não existir:

```sql
CREATE DATABASE dev_resources
  CHARACTER SET utf8mb4
  COLLATE utf8mb4_unicode_ci;
```

Depois, execute [`backend/migrations/10142026_1945_usuarios_e_ferramentas.sql`](backend/migrations/10142026_1945_usuarios_e_ferramentas.sql) nesse banco. O script cria `usuarios` e `ferramentas`; cada ferramenta referencia seu autor por `usuario_id`.

## Como executar

### API

1. No diretório `backend`, copie `.env.example` para `.env`.
2. Configure as credenciais do MySQL e `FRONTEND_ORIGIN` no `.env`.
3. Instale as dependências e inicie a API:

```bash
cd backend
npm install
npm run dev
```

A API usa a porta indicada em `PORT` (3001 no exemplo) e disponibiliza as rotas em `http://localhost:3001/api`.

### Front-end

Em outro terminal:

```bash
cd frontend
npm install
npm run dev -- --port 3005
```

Abra `http://localhost:3005`. O serviço do front-end chama a API em `http://localhost:3001/api`.

## Rotas da API

| Método | Caminho | Uso |
| --- | --- | --- |
| `POST` | `/api/usuarios` | Cadastrar usuário (`nome`, `email`, `senha`) |
| `POST` | `/api/usuarios/login` | Entrar (`email`, `senha`) |
| `GET` | `/api/ferramentas` | Listar; aceita `q` e `categoria` |
| `GET` | `/api/ferramentas/:id` | Consultar uma ferramenta |
| `POST` | `/api/ferramentas` | Cadastrar ferramenta |
| `PUT` | `/api/ferramentas/:id` | Editar ferramenta |
| `DELETE` | `/api/ferramentas/:id` | Excluir ferramenta |

Uma ferramenta contém `nome`, `categoria`, `tipo`, `licenca`, `descricao`, `tags`, `link` e `usuario_id`. O nome do autor retornado pela API vem do registro do usuário.

## Autenticação

Por enquanto, o front-end guarda `{ id, nome, email }` no `localStorage`. A regra de autoria e a proteção das páginas são simuladas no front-end; a API ainda não usa token de sessão.
