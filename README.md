# 📚 Dodo Books - Dashboard de Livros

Este projeto é um dashboard moderno que consome a API pública da **OpenLibrary**, permitindo a navegação por livros com filtros por categoria, busca por palavras-chave, paginação e exibição responsiva.

---

## 🚀 Tecnologias

- **Next.js 15.4.1** com **Turbopack**
- **React 19.1.0**
- **Tailwind CSS 4.x**
- **Shadcn UI** (baseado em Radix, com estilo unificado)
- **@tanstack/react-query 5.83.0**
- **Lucide React** (ícones SVG)
- **TypeScript** com ESLint
- **clsx** e **class-variance-authority**
- **tw-animate-css**

---

## 📦 Instalação

```bash
git clone https://github.com/seu-usuario/dodo-books.git
cd dodo-books
npm install
npm run dev
Abra http://localhost:3000 no navegador para visualizar.

🧩 Scripts Disponíveis
npm run dev – Inicia servidor de desenvolvimento com HMR e Turbopack.

npm run build – Compila aplicação para produção.

npm start – Inicia o app em ambiente de produção.

npm run lint – Executa verificação de estilo com ESLint.

✨ Funcionalidades
🔎 Busca por título ou autor

🗂️ Filtragem por categoria (gênero literário)

📄 Paginação com controle de limite e offset

📚 Cards responsivos de livros

🧱 Componentes reutilizáveis com Shadcn UI

🖼️ Skeletons para carregamento suave

🧠 Gerenciamento de cache de dados com React Query

📐 Decisões Técnicas
Shadcn UI foi utilizado como biblioteca de componentes pela integração com Tailwind e acessibilidade baseada no Radix.

Separação entre componentes de layout, componentes de dados e hooks personalizados.

Uso de useQuery do React Query para cache e estado de carregamento.

Não muita experiência com testes de front, então optei por não das prioridade

Padrões aplicados:

Hook Pattern (useBooks, useCategories)

Container-Presenter Pattern (dado isolado da UI)

Skeleton loading pattern

🔮 Próximos Passos
backend com ruby on rails

página de cadastro e login

página de cadastro de livros personalizados

filtros para livros favoritos

Filtros adicionais (autor, idioma, ano)

Testes automatizados com Jest e RTL

Integração com Storybook

Deploy no Vercel

📚 Créditos
API pública: OpenLibrary

Design System: Shadcn UI

desenvolvido por [Douglas Gemir]
```
