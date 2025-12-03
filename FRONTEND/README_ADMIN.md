Admin Dashboard — README

Setup & run

- Projeto já usa Vite + React + Tailwind. Rode:

```bash
pnpm install
pnpm dev
```

Arquitetura & integração

- Rotas: `/admin` abre o dashboard. Internamente há tabs: Overview, Médicos, Pacientes, Consultas.
- Integração backend: por enquanto a UI usa dados mock. Pontos para integrar:
  - GET /api/medicos?page=1&limit=20
  - POST /api/medicos
  - GET /api/pacientes
  - GET /api/consultas
  - Auth: POST /api/auth/login -> { access_token }

Recomendações para integrar:
- Usar `axios` ou `fetch` wrapper em `src/services/api.ts` e React Query para cache e sincronização.
- Validar formulários com `zod` + `react-hook-form`.

Design

- Veja `DESIGN_TOKENS.md` para paleta, tipografia e motion.
