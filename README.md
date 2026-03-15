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
