# WT Private • shadcn/ui

Site privado do WT simulando o comportamento dos componentes da biblioteca
[shadcn/ui](https://ui.shadcn.com/) para validação dos cenários usados pelos
clientes que adotam essa stack.

## Stack

- Next.js 16 (App Router)
- React 18
- TypeScript
- Tailwind CSS
- shadcn/ui (Radix UI primitives)
- Lucide icons

## Componentes shadcn suportados neste repositório

Os blocos abaixo estão presentes em `components/ui/` e são usados nas páginas de
demonstração (principalmente em **Registros** e no **cabeçalho**):

| Componente      | Arquivo              | Uso no sandbox                                      |
|----------------|----------------------|-----------------------------------------------------|
| Button         | `button.tsx`         | Ações, ícones, menu do usuário, paginação           |
| Input          | `input.tsx`          | Campo de busca                                      |
| Label          | `label.tsx`          | Formulários e filtros                               |
| Select         | `select.tsx`         | Filtros, ordenação, campos do drawer                |
| Checkbox       | `checkbox.tsx`       | Drawer de novo registro (“Compartilha recursos”)    |
| Card           | `card.tsx`           | Início, cartões de filtros e lista                  |
| Table          | `table.tsx`          | Lista de registros                                  |
| Sheet          | `sheet.tsx`          | Primitive base usada para o Drawer lateral          |
| Drawer         | `registro-drawer.tsx`| Formulário lateral de novo registro (via Sheet)     |
| Badge          | `badge.tsx`          | Coluna **Situação** na tabela                       |
| Pagination     | `pagination.tsx`     | Navegação quando a lista excede o tamanho da página |
| Dropdown Menu  | `dropdown-menu.tsx`  | Menu do usuário no header (itens simulados)         |
| Separator      | `separator.tsx`      | Divisor no header (ao lado do título)               |
| Tooltip        | `tooltip.tsx`        | Dicas nos botões **Visualizar** e **Editar**        |

> **Nota:** novos componentes shadcn podem ser adicionados com `npx shadcn@latest add <nome>`; esta tabela reflete apenas o que está versionado e integrado ao fluxo de teste atual.

## Páginas

- `/` — **Início**: explica o objetivo do ambiente e linka para a página de teste.
- `/registros/registros` — **Registros**: página principal de validação,
  com filtros, tabela (incluindo badges, tooltips e paginação), drawer para
  criação de registros e dados sintéticos iniciais em `lib/mock-registros.ts`.

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
