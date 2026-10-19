# DevResources Manager

Gerenciador local para organizar ferramentas úteis para desenvolvimento web. A aplicação permite cadastrar, consultar, buscar, editar e excluir ferramentas em um catálogo.

## Proposta

- **Objetivo:** reunir informações e links de ferramentas para desenvolvimento web.
- **Usuário principal:** pessoa desenvolvedora que deseja consultar ou manter referências de ferramentas.
- **Registro gerenciado:** ferramenta, com nome, categoria, tipo, descrição e link.
- **Escopo:** um único tipo principal de registro, sem contas de usuário ou dados relacionados.

## Tecnologias

- **Front-end:** Next.js, React e App Router.
- **Interface:** Bootstrap 5 e CSS próprio.
- **Back-end:** Node.js e Express.
- **Armazenamento:** array em memória no back-end. Os registros são apagados quando a API é reiniciada.

## Organização do projeto

```text
backend/
  app.js                     configura o Express e conecta as camadas
  server.js                  inicia a API local
  config/ambiente.js         configura e valida a porta
  models/Ferramenta.js       valida os dados de uma ferramenta
  models/FerramentaModel.js  mantém os registros em memória
  services/                  aplica as regras das operações
  controllers/               prepara as respostas HTTP
  routes/                    define as rotas da API

frontend/src/
  app/                       páginas, layout e CSS global
  components/                cabeçalho, formulário e cartão de ferramenta

Analise.txt                 explicação dos arquivos e das relações entre eles
```

As páginas do front-end chamam a API Express com `fetch`. O back-end separa as rotas, os controllers, as regras do service e o armazenamento do model.

## Campos da ferramenta

| Campo | Obrigatório | Limite |
|---|---:|---:|
| Nome | Sim | 120 caracteres |
| Categoria | Sim | 80 caracteres |
| Tipo | Não | 80 caracteres |
| Descrição | Sim | 1000 caracteres |
| Link | Sim | URL começando com `http://` ou `https://` |

## API

Endereço local padrão: `http://localhost:3001/api`.

| Método | Rota | Operação |
|---|---|---|
| GET | `/ferramentas` | Lista as ferramentas |
| GET | `/ferramentas/:id` | Consulta uma ferramenta pelo ID |
| POST | `/ferramentas` | Cadastra uma ferramenta |
| PUT | `/ferramentas/:id` | Atualiza uma ferramenta |
| DELETE | `/ferramentas/:id` | Exclui uma ferramenta |
| GET | `/check` | Verifica se a API está ativa |

Os dados enviados e recebidos usam JSON. A API valida os campos e retorna mensagens de erro quando a solicitação não pode ser concluída.

## Como executar localmente

É necessário ter Node.js e npm instalados.

### 1. Iniciar o back-end

No terminal:

```bash
cd backend
npm ci
npm run dev
```

A API ficará disponível em `http://localhost:3001`. Para verificar se está ativa, acesse `http://localhost:3001/api/check`.

### 2. Iniciar o front-end

Abra outro terminal na pasta do projeto:

```bash
cd frontend
npm ci
npm run dev
```

Abra `http://localhost:3000` no navegador.

O front-end usa `http://localhost:3001/api` como endereço padrão da API. Para usar outro endereço, configure `NEXT_PUBLIC_API_URL` no ambiente do front-end.

## Observação sobre os dados

As ferramentas são armazenadas somente enquanto o processo do back-end estiver em execução. Ao reiniciar a API, o catálogo volta a ficar vazio. Isso atende ao escopo local da atividade e dispensa banco de dados.
