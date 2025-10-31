
# CRUD Base em Flask

Este diretório contém uma API exemplo (Flask + SQLAlchemy) que serve como contrato para os desenvolvedores backend do projeto FluiSaúde. A ideia é manter uma base mínima, funcional e auto-explicativa que o time frontend pode usar enquanto o backend final é implementado.

Resumo rápido
- API RESTful com recursos: Pacientes, Médicos, Especialidades e Consultas.
- Arquitetura: Flask, Blueprints, Flask-SQLAlchemy, CORS habilitado.
- Local de execução usado para desenvolvimento neste repositório: porta 5001 (evita conflitos locais com outras instâncias).

Principais endpoints (registrados sob `/api`)
- `POST   /api/pacientes`       — criar paciente
- `GET    /api/pacientes`       — listar todos
- `GET    /api/pacientes/:id`   — obter paciente
- `PUT    /api/pacientes/:id`   — atualizar paciente
- `DELETE /api/pacientes/:id`   — deletar paciente

- `POST   /api/medicos`         — criar médico
- `GET    /api/medicos`         — listar todos
- `GET    /api/medicos/:id`     — obter médico
- `PUT    /api/medicos/:id`     — atualizar médico
- `DELETE /api/medicos/:id`     — deletar médico

- `POST   /api/especialidades`  — criar especialidade
- `GET    /api/especialidades`  — listar todos
- `GET    /api/especialidades/:id` — obter especialidade
- `PUT    /api/especialidades/:id` — atualizar
- `DELETE /api/especialidades/:id` — deletar

- `POST   /api/consultas`       — criar consulta
- `GET    /api/consultas`       — listar todos
- `GET    /api/consultas/:id`   — obter consulta
- `PUT    /api/consultas/:id`   — atualizar consulta
- `DELETE /api/consultas/:id`   — deletar consulta

Observação sobre shapes
- Os modelos e suas representações JSON ficam em `app/models/*.py`. Por padrão cada `to_json()` retorna os campos principais (ex.: `Medico` retorna `especialidade_id`). Se preferir que a API devolva objetos relacionados (ex.: `especialidade` aninhada), ajuste `to_json()` conforme necessário.

Executando localmente (desenvolvimento)
1. Abra um terminal em `CRUD BASE/BACKEND`.
2. Crie e ative um virtualenv (macOS / Linux):

```bash
python3 -m venv .venv
source .venv/bin/activate
```

3. Instale dependências:

```bash
pip install -r requirements.txt
```

4. Inicie o servidor (por padrão neste repositório usamos a porta 5001 para evitar conflitos):

```bash
python run.py
# ou explicitamente: python -c "from app import create_app; app=create_app(); app.run(port=5001, debug=True)"
```

5. A API ficará disponível em `http://localhost:5001/api`.

Integração com o frontend (dashboard)

- O frontend React também pode ser empacotado e servido pelo mesmo servidor Flask para facilitar deploys simples. O build do frontend (Vite) é copiado para `app/static/app/` e servido na raiz `/` da aplicação.
- Mantemos ainda uma versão estática do dashboard em `app/static/dashboard/index.html` (mais simples), disponível em `/dashboard`.
- Resultado:
    - `GET /` — serve o build React copiado para `app/static/app` (caso você tenha rodado `npm run build` e copiado `dist/`).
    - `GET /dashboard` — serve a versão estática do dashboard (local: `app/static/dashboard/index.html`).
    - Todos os endpoints da API permanecem em `/api/*` e a interface cliente deve chamar rotas relativas (por exemplo `/api/pacientes`) para funcionar quando servido pelo mesmo host.

Testes rápidos (curl)
- Listar pacientes:
    ```bash
    curl http://localhost:5001/api/pacientes
    ```
- Criar paciente:
    ```bash
    curl -X POST http://localhost:5001/api/pacientes -H "Content-Type: application/json" -d '{"nome":"Fulano","cpf":"12345678901","telefone":"(11)99999-9999"}'
    ```

