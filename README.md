# DevResources Manager

Projeto com um front-end Next.js para um catálogo de ferramentas e uma API em Express/MySQL. O código está em processo de alinhamento: as páginas do front-end tratam ferramentas e usuários, e o back-end contém a base do CRUD de ferramentas.

## Tecnologias

- Front-end: Next.js, React e CSS.
- Back-end: Node.js, Express e MySQL (`mysql2`).

## Estrutura

```text
backend/
  app.js         configuração do Express, middlewares e rotas
  config/        configuração do ambiente e conexão MySQL
  controllers/   tratamento das requisições de ferramentas
  migrations/    criação da tabela ferramentas
  models/        entidade e consultas de ferramentas
  routes/        endpoints de ferramentas
  services/      regras do CRUD de ferramentas
  server.js      carregamento do ambiente e inicialização do servidor

frontend/src/
  app/           páginas, layout e estilos
  components/    Header, CardFerramenta e FormFerramenta
```

## Estado atual e integração

O `server.js` segue o padrão de inicialização indicado pelo professor e inicia a aplicação definida em `backend/app.js`. Atualmente, `app.js` registra as rotas `/api/ferramentas`, mas cadastro e login de usuários ainda não estão implementados. As rotas atuais de ferramentas permitem listar, consultar por ID e cadastrar; o front-end também espera edição e exclusão.

As páginas do front-end esperam funções de comunicação com a API em `frontend/src/services`, pasta que não está presente. A migração define as tabelas `usuarios` e `ferramentas`, com `usuario_id` ligado ao autor. O formulário e o card usam os campos `nome`, `categoria`, `tipo`, `descricao` e `link`. O serviço ainda precisa ser alinhado ao model para que o CRUD funcione.

## Configuração do banco

Crie um banco MySQL e configure `backend/.env` com os dados da sua instalação. O código exige:

```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=dev_resources
```

`PORT` é opcional e assume `3000`. A migração cria as tabelas quando elas ainda não existem; ela não altera automaticamente uma tabela antiga.

## Instalação

```bash
cd backend
npm install
```

Em outro terminal:

```bash
cd frontend
npm install
```

## Execução

Front-end:

```bash
cd frontend
npm run dev -- --port 3005
```

Back-end:

```bash
cd backend
npm run dev
```

O back-end depende de um `.env` local válido e de alinhar o serviço aos campos atuais antes que as operações do CRUD funcionem corretamente.




