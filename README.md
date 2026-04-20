# WT Private • shadcn/ui

Site privado do WT simulando o comportamento dos componentes da biblioteca
[shadcn/ui](https://ui.shadcn.com/) para validação dos cenários usados pelos
clientes que adotam essa stack.

## Stack

- Next.js 14 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI primitives)
- Lucide icons

## Páginas

- `/` — **Início**: explica o objetivo do ambiente e linka para a página de teste.
- `/operacoes-demandas/demandas` — **Demandas**: página principal de validação,
  replicando o layout do cliente (filtros, tabela, botão de cadastro e drawer
  de cadastro com selects, inputs, checkbox, etc.).

## Como rodar

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

## Build de produção

```bash
npm run build
npm start
```
