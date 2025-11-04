
# CRUD Base em Flask

Este diretório contém uma API exemplo (Flask + SQLAlchemy) que serve como contrato para os desenvolvedores backend do projeto FluiSaúde. A ideia é manter uma base mínima, funcional e auto-explicativa que o time frontend pode usar enquanto o backend final é implementado.

Resumo rápido
- API RESTful com recursos: Pacientes, Médicos, Especialidades e Consultas.
- Arquitetura: Flask, Blueprints, Flask-SQLAlchemy, CORS habilitado.
- Local de execução usado para desenvolvimento neste repositório: porta 5001 (evita conflitos locais com outras instâncias).

Principais endpoints (registrados sob `/api`)
````markdown

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

# CRUD Base — Backend de referência (Flask)

Este diretório fornece uma implementação de referência do backend (Flask + SQLAlchemy) que o frontend consome durante o desenvolvimento. Ele inclui modelos (`Paciente`, `Medico`, `Especialidade`, `Consulta`), Blueprints para rotas e duas opções de UI estática:

- `app/static/dashboard/index.html` — dashboard simples e estático (serve como fallback/versão leve);
- `app/static/app/` — local onde você pode copiar o build do frontend (Vite) para servir o SPA pelo Flask.

Porta padrão em desenvolvimento
- Por convenção neste repositório usamos a porta 5001 para o servidor de desenvolvimento (evita conflitos locais com outras instâncias do Flask). Os scripts `run.py` já estão configurados para `port=5001`.

Principais endpoints (prefixo `/api`)
- Pacientes: `GET /api/pacientes`, `POST /api/pacientes`, `GET /api/pacientes/<id>`, `PUT /api/pacientes/<id>`, `DELETE /api/pacientes/<id>`
- Médicos: `GET /api/medicos`, `POST /api/medicos`, `GET /api/medicos/<id>`, `PUT /api/medicos/<id>`, `DELETE /api/medicos/<id>`
- Especialidades: `GET /api/especialidades`, `POST /api/especialidades`, etc.
- Consultas: `GET /api/consultas`, `POST /api/consultas`, `GET /api/consultas/<id>`, `PUT /api/consultas/<id>`, `DELETE /api/consultas/<id>`

Requests e formatos importantes
- `pacientes.cpf` é armazenado como string de 11 caracteres (apenas números).
- `consultas.data_agendamento` é um campo `DateTime` — o frontend envia ISO-8601 (ex.: `2025-10-31T14:30`). O backend aceita também o formato `YYYY-MM-DDTHH:MM`.

Como executar localmente (guia passo-a-passo)

1) Abrir terminal no diretório do backend de referência:
```bash
cd "CRUD BASE/BACKEND"
```

2) (Recomendado) Criar e ativar um venv isolado:
```bash
python3 -m venv .venv
source .venv/bin/activate
```

3) Instalar dependências:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

4) Iniciar o servidor de desenvolvimento (porta 5001):
```bash
python run.py
```
Agora a API estará disponível em `http://127.0.0.1:5001/api`.

Integração com o frontend (modo single-server)

Gerar build do frontend e copiar para o backend (passos):
```bash
cd FRONTEND
npm install
npm run build
mkdir -p "../CRUD BASE/BACKEND/app/static/app"
rsync -a --delete dist/ "../CRUD BASE/BACKEND/app/static/app/"
```
Depois inicie o backend (passo 4 acima) e abra `http://127.0.0.1:5001/`.

Observações e dicas
- A aplicação também oferece `GET /dashboard` que serve a versão simples em `app/static/dashboard/index.html`.
- O código dos modelos e routes está em `app/models` e `app/routes` — sinta-se à vontade para ajustar `to_json()` caso queira retornar objetos aninhados (ex.: incluir `especialidade` completo no retorno de `medico`).

Exemplos curl úteis
```bash
# listar pacientes
curl http://127.0.0.1:5001/api/pacientes

# criar paciente
curl -X POST http://127.0.0.1:5001/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Fulano","cpf":"12345678901","telefone":"(11)99999-9999"}'
```

Erros comuns e como resolver
- "No module named 'flask'": ative o venv e rode `pip install -r requirements.txt` no diretório `CRUD BASE/BACKEND`.
- "Port 5001 is in use": identifique o processo com `lsof -iTCP:5001 -sTCP:LISTEN -n -P` e mate o PID (`kill PID`), ou altere temporariamente a porta.
- Banco SQLite não aparece: confirme que a pasta `instance/` existe e que o processo tem permissão de escrita; o arquivo de DB é criado automaticamente em `instance/banco_de_dados.db`.

Próximos passos recomendados
- Remover duplicação entre `BACKEND/` e `CRUD BASE/BACKEND/` (manter apenas uma cópia funcional) — o caminho curto é copiar `CRUD BASE/BACKEND/app/` para `BACKEND/app/` se quiser sincronizar.
- Adicionar testes automatizados e scripts de CI.

---

### Seção técnica adicional (aprimoramentos e debugging)

1) Migrações e esquema de banco
- Recomendado: adicionar Flask-Migrate para versionar alterações no esquema e evitar perda manual.

2) Testes
- Adicionar uma suíte mínima de testes com `pytest` cobrindo: criação de paciente, criação de consulta, e leitura de listas.

3) Execução em produção
- Use gunicorn + nginx ou uWSGI para servir a aplicação em produção. Exemplo rápido:
```bash
gunicorn -w 4 "app:create_app()"
```

4) Logs e monitoração
- Configure logging para arquivos rotativos e exporte métricas básicas (tempo de resposta, 5xx) para facilitar análise.

5) Segurança
- Não comitar secrets. Use `SECRET_KEY` via variável de ambiente em produção.

6) Docker
- Um `Dockerfile` simples e `docker-compose.yml` ajudam a padronizar o ambiente de dev e CI.

````

