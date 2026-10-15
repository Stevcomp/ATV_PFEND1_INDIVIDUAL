# DevResources Manager

Projeto dividido em um front-end Next.js para um catálogo de ferramentas e um back-end Express/MySQL. No estado atual, as duas partes ainda não estão integradas: o front-end apresenta páginas de ferramentas e usuários, enquanto o back-end contém arquivos-base de CRUD de produtos. O servidor ainda referencia módulos de ferramentas e usuários que não estão presentes, e as rotas de produtos não estão registradas nele.

## Tecnologias

- Front-end: Next.js, React e CSS.
- Back-end: Node.js, Express e MySQL (`mysql2`).
- `bcryptjs` está listado nas dependências do back-end para uso com senhas.

## Estrutura atual

```text
backend/
  config/       configuração do ambiente e conexão MySQL
  controllers/  controller do CRUD de produtos
  migrations/  script SQL da tabela de produtos
  models/       entidade e consultas de produtos
  routes/       rotas de produtos
  services/     regras do CRUD de produtos
  server.js     inicialização da API (ainda referencia módulos ausentes)

frontend/src/
  app/          páginas, layout e estilos
  components/   componentes de interface
```

## Estado de funcionamento

O back-end ainda não inicia corretamente: `backend/server.js` importa módulos de usuários e ferramentas que não existem atualmente. Além disso, ele não registra `produtoRoutes.js`; portanto, o CRUD de produtos não está acessível por meio do servidor atual.

As páginas do front-end também esperam chamadas para a API de ferramentas e usuários, mas a pasta `frontend/src/services` não está presente. Assim, a integração entre as páginas e a API precisa ser concluída antes de executar o sistema completo.

## Configuração do banco

O back-end exige um banco MySQL e estas variáveis de ambiente no arquivo `backend/.env`:

```env
PORT=3001
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=
DB_NAME=dev_resources
```

`NOME_ALUNO`, `TURMA`, `FRONTEND_ORIGIN` e `NODE_ENV` são opcionais no código atual. Configure os valores locais de acordo com o MySQL instalado. O arquivo `.env` não é versionado.

A migração encontrada é `backend/migrations/20260928_1627_criar_tabela_produto.sql`, mas sua instrução `CREATE TABLE` está com sintaxe incompleta. Corrija-a antes de executá-la no MySQL.

## Instalação

Instale as dependências em cada diretório:

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

Para iniciar o front-end:

```bash
cd frontend
npm run dev -- --port 3005
```

Para iniciar o back-end:

```bash
cd backend
npm run dev
```

A execução do back-end depende de corrigir os imports ausentes no `server.js` ou restaurar os módulos correspondentes. Até isso ser resolvido, a API não estará disponível para o front-end.
