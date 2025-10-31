# FluiSaúde - Frontend
````markdown
# FluiSaúde - Frontend

Este é o frontend da aplicação FluiSaúde, uma interface moderna e intuitiva para gerenciar agendamentos e informações de saúde.

## Tecnologias

- React
- TypeScript
- Tailwind CSS
- Vite
- React Router DOM

## Como Iniciar (desenvolvimento)

1. Clone o repositório (se ainda não clonou):
```bash
git clone https://github.com/caua-rego/fluisaude.git
cd fluisaude/FRONTEND
```

2. Instale dependências:
```bash
npm install
```

3. Execute o servidor de desenvolvimento (Vite):
```bash
npm run dev
# Acesse: http://localhost:5173 (ou a porta indicada pelo Vite no terminal)
```

### Notas sobre a base da API
- O frontend foi configurado para usar rotas relativas (`/api`) no arquivo `src/services/api.ts`. Isso permite duas formas de trabalhar:
    1. Rodar frontend em modo dev (`npm run dev`) e backend separado (por exemplo `CRUD BASE/BACKEND` em `http://127.0.0.1:5001`) — então ajuste proxys se necessário no `vite.config.ts` ou use chamadas diretas para `http://127.0.0.1:5001/api`.
    2. Gerar o build e servir o `dist/` do mesmo host do backend (recomendado para teste integrado) — o frontend usará `/api` automaticamente.

## Gerar build de produção
```bash
npm run build
# saída: dist/
```

## Servir o build pelo backend (integração single-server)
1. Gere o build: `npm run build`.
2. Copie os arquivos de `dist/` para o local estático do backend, por exemplo:
```bash
mkdir -p "../CRUD BASE/BACKEND/app/static/app"
rsync -a --delete dist/ "../CRUD BASE/BACKEND/app/static/app/"
```
3. Inicie o backend (veja `CRUD BASE/BACKEND/README.md`) e abra `http://127.0.0.1:5001/`.

## Boas práticas e debugging
- Se o frontend em dev não consegue acessar a API (CORS), verifique se o backend tem CORS habilitado (o backend de referência faz isso por padrão).
- Se usar Vite e quiser redirecionar chamadas `/api` para outro host durante o dev, configure `server.proxy` em `vite.config.ts`:
```js
// vite.config.ts
export default defineConfig({
    server: {
        proxy: {
            '/api': 'http://127.0.0.1:5001'
        }
    }
})
```

## Estrutura de Rotas

- **`/`**: Página inicial da aplicação.
- **`/dashboard`**: Painel principal com navegação para os módulos CRUD.
    - **`/dashboard/pacientes`**: Gerenciamento de pacientes.
    - **`/dashboard/medicos`**: Gerenciamento de médicos.
    - **`/dashboard/consultas`**: Gerenciamento de consultas.
    - **`/dashboard/especialidades`**: Gerenciamento de especialidades.

## Sugestões de melhorias
- Adicionar linting/formatting (ESLint + Prettier) com regras do time.
- Adicionar testes unitários com Vitest / Jest para componentes críticos.
- Configurar uma pipeline simples de CI (GitHub Actions) que roda `npm test` e `npm run build`.

````
