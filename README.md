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
- `/registros/registros` — **Registros**: página principal de validação,
  com filtros, tabela e drawer para criação de registros mockados.

## Fluxo validado

- Criação de registro via drawer (campos obrigatórios validados)
- Listagem dinâmica na tabela após cadastro
- Busca por `Registro`, `Cliente`, `Código` e `Responsável`
- Limpeza de filtros
- Ordenação da lista (crescente/decrescente)

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
