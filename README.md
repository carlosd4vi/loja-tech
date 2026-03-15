# 🛒 Loja Tech - Frontend

O frontend da **Loja Tech** é uma aplicação web moderna que une um e-commerce para clientes finais e um painel administrativo (Dashboard) completo para o gerenciamento de produtos. 

Este projeto foi construído com foco na experiência do usuário (UX), interface responsiva e consumo eficiente de dados usando Supabase como Backend-as-a-Service (BaaS).

## 🚀 Tecnologias Utilizadas

* **React (Vite/Create React App):** Biblioteca principal para construção da interface.
* **Tailwind CSS:** Estilização utilitária para um design rápido, moderno e responsivo.
* **React Router DOM:** Gerenciamento de rotas (Navegação entre Loja, Painel, Edição, etc).
* **Supabase:** Consumo direto do banco de dados PostgreSQL e Autenticação.
* **Vercel:** Plataforma de hospedagem (Deploy) contínuo.

## ✨ Principais Funcionalidades

### 🛍️ Área do Cliente (E-commerce)
* **Catálogo Dinâmico:** Listagem de produtos puxados em tempo real do banco de dados.
* **Busca Inteligente:** Barra de pesquisa "Live Search" que filtra produtos instantaneamente com dropdown visual.
* **Página de Detalhes:** Visualização completa do produto com imagens, avaliações em `.map()` e especificações técnicas.
* **Checkout Simulado:** Modal de pagamento via PIX integrado diretamente na página do produto.

### ⚙️ Área Administrativa (Dashboard)
* **Rotas Protegidas:** Acesso ao painel restrito apenas para administradores logados (Supabase Auth).
* **CRUD Completo:** Criação, leitura, atualização e exclusão de produtos no estoque.
* **Modais de Confirmação:** Prevenção de ações acidentais na exclusão ou salvamento de itens.
* **Feedbacks Visuais (Toasts):** Notificações flutuantes de sucesso ou erro integradas às respostas da API.
* **Upload de Imagens:** Suporte para envio de fotos dos produtos.

## 🚀 Como rodar o projeto localmente

Siga o passo a passo abaixo para rodar a **Loja Tech** na sua própria máquina.

### 1️⃣ Pré-requisitos
Antes de começar, você vai precisar ter instalado em seu computador as seguintes ferramentas:
* [Git](https://git-scm.com) (Para clonar o código)
* [Node.js](https://nodejs.org/en/) (Obrigatório para rodar o React - Recomendado a versão LTS)

### 2️⃣ Clonando o repositório
Abra o seu terminal (ou o Git Bash) e digite o comando abaixo para baixar todo o código para a sua máquina:

```bash
git clone [https://github.com/carlosd4vi/loja-tech.git](https://github.com/carlosd4vi/loja-tech.git)

# Entre na pasta
cd FrondEnd
# Instale as dependências
npm install @supabase/supabase-js react react-dom react-router-dom

# Crie uma Pasta .ENV
SUPABASE_URL=
SUPABASE_KEY=

# inicie o Projeto
npm run dev
