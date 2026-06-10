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
| Popover        | `popover.tsx`        | Base de overlay para o DatePicker                   |
| Calendar       | `calendar.tsx`       | Calendário de seleção de data                       |
| DatePicker     | `date-picker.tsx`    | Filtro por data na página de Registros              |
| Pagination     | `pagination.tsx`     | Navegação quando a lista excede o tamanho da página |
| Dropdown Menu  | `dropdown-menu.tsx`  | Menu do usuário no header (itens simulados)         |
| Separator      | `separator.tsx`      | Divisor no header (ao lado do título)               |
| Tooltip        | `tooltip.tsx`        | Dicas nos botões **Visualizar** e **Editar**        |

### Prioridade alta (sandbox em `/registros/registros`)

Demonstração na página **Registros**, bloco **SANDBOX WT** (`wt-component-sandbox.tsx`), com `data-wt-component` e ids `wt-*` para o WavingTest.

| Componente     | Arquivo              | Dependências / notas                          |
|----------------|----------------------|-----------------------------------------------|
| Dialog         | `dialog.tsx`         | Modais de detalhe e formulários curtos         |
| Alert Dialog   | `alert-dialog.tsx`   | Confirmações destrutivas                      |
| Sonner         | `sonner.tsx`         | Toasts (`toast` de `sonner` + `<Toaster />`)  |
| Form           | `form.tsx`           | `react-hook-form` + `zod`                     |
| Textarea       | `textarea.tsx`       | Campos de texto longo                          |
| Command        | `command.tsx`        | Base do Combobox (palette / busca)              |
| Combobox       | `combobox.tsx`       | Select pesquisável (`Command` + `Popover`)    |
| Tabs           | `tabs.tsx`           | Abas e seções                                 |
| Skeleton       | `skeleton.tsx`       | Estados de carregamento                       |
| Alert          | `alert.tsx`          | Mensagens inline (info, erro, aviso)          |
| Context Menu   | `context-menu.tsx`   | Menu de contexto (ex.: clique na linha)       |

### Prioridade média (sandbox em `/registros/registros`)

Bloco violeta abaixo do sandbox de prioridade alta (`wt-component-sandbox-medium.tsx`).

| Componente   | Arquivo            |
|--------------|--------------------|
| Switch       | `switch.tsx`       |
| Radio Group  | `radio-group.tsx`  |
| Scroll Area  | `scroll-area.tsx`  |
| Collapsible  | `collapsible.tsx`  |
| Accordion    | `accordion.tsx`    |
| Avatar       | `avatar.tsx`       |
| Breadcrumb   | `breadcrumb.tsx`   |
| Hover Card   | `hover-card.tsx`   |

### Prioridade baixa (sandbox em `/registros/registros`)

Bloco azul-claro abaixo do sandbox de prioridade média (`wt-component-sandbox-low.tsx`).

| Componente    | Arquivo             |
|---------------|---------------------|
| Slider        | `slider.tsx`        |
| Toggle        | `toggle.tsx`        |
| Toggle Group  | `toggle-group.tsx`  |
| Input OTP     | `input-otp.tsx`     |
| Aspect Ratio  | `aspect-ratio.tsx`  |
| Carousel      | `carousel.tsx`      |
| Chart         | `chart.tsx`         |
| Resizable     | `resizable.tsx`     |

> **Nota:** `Command` já existe e serve de base ao Combobox (prioridade alta).

> **Nota:** novos componentes shadcn podem ser adicionados com `npx shadcn@latest add <nome>`; esta tabela reflete o que está versionado no projeto.

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
