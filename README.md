# 🚀 DevResources - Curadoria de Recursos Gratuitos para Devs

O **DevResources** é uma aplicação web desenvolvida em **Next.js** e **React** para catalogar e filtrar cursos, documentações, ferramentas e guias 100% gratuitos voltados para quem está aprendendo a programar ou quer se aprofundar na área de tecnologia.

Este projeto faz parte do repositório de estudos **`APIs_atividades_e_aprendizados`**, focado no consumo de dados, gerenciamento de estado e estilização de interfaces modernas.

---

## 📑 Sumário

- [Demonstração das Funcionalidades](#-funcionalidades)
- [Tecnologias Utilizadas](#-tecnologias-utilizadas)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Executar o Projeto](#-como-executar-o-projeto)
- [Modelo de Dados (JSON)](#-modelo-de-dados-json)

---

## ✨ Funcionalidades

- 🔍 **Catálogo de Recursos:** Exibição em cards com informações de cursos, artigos, documentações e ferramentas.
- 🏷️ **Filtros por Categoria:** Busca por tecnologia (React, Python, SQL, etc.), nível de conhecimento (Iniciante, Intermediário) e idioma (PT-BR / EN).
- 🔗 **Acesso Direto:** Links externos configurados com boas práticas de segurança (`target="_blank"` e `rel="noopener noreferrer"`).
- 📱 **Layout Responsivo:** Grade (*Grid Layout*) adaptável para dispositivos móveis, tablets e desktops.

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
│   │   ├── globals.css          # Estilos globais da aplicação
│   │   ├── layout.jsx           # Layout principal (Header, Footer e Metadados)
│   │   └── page.jsx             # Página principal com busca e estados
│   ├── components/
│   │   └── cardRecurso/
│   │       ├── index.jsx        # Componente reutilizável do card
│   │       └── cardRecurso.css  # Estilização do card
│   └── data/
│       └── recursos.json        # Arquivo local / Mock da API
├── public/
├── package.json
└── README.md
