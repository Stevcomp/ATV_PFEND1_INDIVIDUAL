# 🛠️ DevResources - Curadoria de Ferramentas e Utilitários para Devs

O **DevResources** é uma aplicação web desenvolvida em **Next.js** e **React** projetada para servir como um catálogo centralizado de ferramentas, geradores, conversores e utilitários 100% gratuitos ou open source para desenvolvedores.

Este projeto faz parte do repositório de estudos **`APIs_atividades_e_aprendizados`**, com foco em consumo de dados, gerenciamento de estado e estilização de interfaces modernas para o ecossistema dev.

---

## 📑 Sumário

- [Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Modelo de Dados (JSON)](#-modelo-de-dados-json)

---

## ✨ Funcionalidades

- 🧰 **Catálogo de Utilitários:** Exibição em cards com detalhes sobre ferramentas de API, geradores CSS, conversores de código e utilitários de banco de dados.
- 🎯 **Filtros por Categoria:** Navegação rápida entre categorias como `UI & Frontend`, `API & Backend`, `Conversores`, `Banco de Dados` e `Produtividade`.
- 🏷️ **Busca por Tags e Licença:** Filtragem por tipo de licença (`Open Source`, `Gratuito`, `Freemium`) e pesquisa por tecnologias/tags (`#JSON`, `#CSS`, `#GraphQL`).
- 🔗 **Acesso Direto Seguro:** Links externos configurados com as melhores práticas de segurança (`target="_blank"` e `rel="noopener noreferrer"`).
- 📱 **Design Responsivo:** Layout adaptável em grade (*Grid Layout*) construído com CSS puro.

---

## 🛠️ Tecnologias Utilizadas

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Biblioteca Front-end:** [React](https://react.dev/)
- **Estilização:** CSS3 puro (Flexbox e Grid Layout)
- **Linguagem:** JavaScript (ES6+)

---

## 📁 Estrutura do Projeto

```text
dev-resources/
├── src/
│   ├── app/
│   │   ├── globals.css            # Estilos globais da aplicação
│   │   ├── layout.jsx             # Layout principal (Header, Footer e Metadados)
│   │   └── page.jsx               # Página principal com os estados e filtros
│   ├── components/
│   │   └── cardFerramenta/
│   │       ├── index.jsx          # Componente do card de ferramenta
│   │       └── cardFerramenta.css # Estilização do card
│   └── data/
│       └── ferramentas.json       # Arquivo de dados / Mock dos utilitários
├── public/
├── package.json
└── README.md