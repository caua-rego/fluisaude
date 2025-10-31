# Backend do FluiSaúde

Este diretório contém o backend da aplicação FluiSaúde, uma API RESTful desenvolvida com Flask para gerenciar pacientes, médicos, especialidades e consultas.
````markdown
# Backend do FluiSaúde

Este diretório contém o backend da aplicação FluiSaúde, uma API RESTful desenvolvida com Flask para gerenciar pacientes, médicos, especialidades e consultas.

## Arquitetura

A aplicação segue uma arquitetura modular, utilizando Blueprints do Flask para separar as responsabilidades de cada entidade do sistema.

```
/BACKEND/
├───run.py
├───requirements.txt
├───config.py
├───instance/
│   └───banco_de_dados.db
└───app/
    ├───__init__.py
    ├───models/
    │   ├───paciente.py
    │   ├───medico.py
    │   ├───consulta.py
    │   └───especialidade.py
    └───routes/
        ├───pacientes.py
        ├───medicos.py
        ├───consultas.py
        └───especialidades.py
```

### Componentes

*   **`run.py`**: Ponto de entrada para iniciar o servidor Flask.
*   **`requirements.txt`**: Lista as dependências Python do projeto.
*   **`config.py`**: Contém as configurações da aplicação, como a URI do banco de dados e a chave secreta.
*   **`instance/`**: Armazena o arquivo do banco de dados SQLite (`banco_de_dados.db`).
*   **`app/`**: Pacote principal da aplicação.
    *   **`__init__.py`**: Inicializa a aplicação Flask, o SQLAlchemy e registra os Blueprints.
    *   **`models/`**: Define os modelos de dados (tabelas) do SQLAlchemy.
    *   **`routes/`**: Define as rotas da API (endpoints) para cada módulo usando Blueprints.

## Como Executar

1.  **Instale as dependências (recomendado num venv):**

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    pip install --upgrade pip
    pip install -r requirements.txt
    ```

2.  **Execute a aplicação:**

    ```bash
    python run.py
    ```

    Observação: Se `run.py` estiver configurado para porta 5001, o servidor ficará em `http://127.0.0.1:5001`.

## Endpoints da API

A API fornece endpoints para as operações de CRUD em cada um dos módulos. A lista abaixo resume os principais recursos:

### Pacientes

*   `GET /api/pacientes`
*   `POST /api/pacientes`
*   `GET /api/pacientes/<id>`
*   `PUT /api/pacientes/<id>`
*   `DELETE /api/pacientes/<id>`

### Médicos

*   `GET /api/medicos`
*   `POST /api/medicos`
*   `GET /api/medicos/<id>`
*   `PUT /api/medicos/<id>`
*   `DELETE /api/medicos/<id>`

### Especialidades

*   `GET /api/especialidades`
*   `POST /api/especialidades`
*   `GET /api/especialidades/<id>`
*   `PUT /api/especialidades/<id>`
*   `DELETE /api/especialidades/<id>`

### Consultas

*   `GET /api/consultas`
*   `POST /api/consultas`
*   `GET /api/consultas/<id>`
*   `PUT /api/consultas/<id>`
*   `DELETE /api/consultas/<id>`

---

## Seção técnica (comandos rápidos e formatos)

- Recomendado: sempre usar venv isolado para evitar misturar dependências.
- Para rodar em outra porta: edite `run.py` ou use `FLASK_RUN_PORT` se iniciar via `flask run`.
- Para desenvolvimento frontend+backend: rode Vite (`npm run dev`) e o backend (`python run.py`) em terminais separados; ou gere o build e copie `dist/` para `app/static/app`.

## Dicas de troubleshooting

- `ImportError: cannot import name 'create_app'`: verifique `app/__init__.py` — se estiver vazio, copie a versão funcional de `CRUD BASE/BACKEND/app/`.
- `Port 5001 is in use`: use `lsof` para encontrar e `kill` para liberar a porta.
- `No module named 'flask'`: ative o `.venv` e rode `pip install -r requirements.txt`.

````
