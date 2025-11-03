# Backend do FluiSaúde

Este diretório contém o backend da aplicação FluiSaúde, uma API RESTful desenvolvida com Flask para gerenciar pacientes, médicos, especialidades e consultas.
````markdown
# Backend do FluiSaúde

Este diretório contém o backend da aplicação FluiSaúde, uma API RESTful desenvolvida com Flask para gerenciar pacientes, médicos, especialidades e consultas.

## Arquitetura

A aplicação segue uma arquitetura modular, utilizando Blueprints do Flask para separar as responsabilidades de cada entidade dos sistemas.

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

## Como Executar (atualizado e prático)

1.  **Criar e ativar um ambiente virtual (recomendado):**

    ```bash
    python3 -m venv .venv
    source .venv/bin/activate
    ```

2.  **Instalar as dependências:**

    ```bash
    pip install --upgrade pip
    pip install -r requirements.txt
    ```

3.  **Executar a aplicação (padrão):**

    ```bash
    python run.py
    ```

    Observação: Em alguns diretórios deste repositório o servidor foi configurado para rodar na porta **5001** (para evitar conflitos). Verifique `run.py` se quiser confirmar/alterar a porta.

## Endpoints da API

A API fornece endpoints para as operações de CRUD em cada um dos módulos. Os endpoints têm prefixo `/api/` (ex.: `/api/pacientes`).

### Formatos e convenções importantes

- Todos os endpoints que recebem payloads JSON esperam o header `Content-Type: application/json`.
- `pacientes.cpf`: string de 11 dígitos (apenas números), ex.: `"12345678901"`.
- `consultas.data_agendamento`: enviar em `YYYY-MM-DDTHH:MM` ou ISO-8601; o backend faz parse para `datetime`.

### Exemplos de uso (curl)

```bash
# listar pacientes
curl http://127.0.0.1:5001/api/pacientes

# criar paciente
curl -X POST http://127.0.0.1:5001/api/pacientes \
  -H "Content-Type: application/json" \
  -d '{"nome":"Fulano","cpf":"12345678901","telefone":"(11)99999-9999"}'

# criar consulta
curl -X POST http://127.0.0.1:5001/api/consultas \
  -H "Content-Type: application/json" \
  -d '{"paciente_id":1,"medico_id":1,"data_agendamento":"2025-10-31T14:30"}'
```

## Debugging e troubleshooting

- `ImportError: cannot import name 'create_app' from 'app'` — significa que `app/__init__.py` não exporta `create_app`. Use a versão funcional em `CRUD BASE/BACKEND` ou copie `CRUD BASE/BACKEND/app/` para `BACKEND/app/`.
- `ModuleNotFoundError: No module named 'flask'` — ative o `.venv` correto e instale as dependências com `pip install -r requirements.txt`.
- Porta ocupada: `lsof -iTCP:<port> -sTCP:LISTEN -n -P` para identificar e `kill <PID>` para liberar.

## Integração com frontend

Se você deseja servir o frontend a partir deste backend, gere o build no diretório `FRONTEND` e copie o conteúdo de `dist/` para `BACKEND/app/static/app/` (ou para `CRUD BASE/BACKEND/app/static/app/` caso prefira o backend de referência). Em seguida, acesse a raiz (`/`) para ver o SPA servido pelo Flask.

## Recomendações

- Utilize `CRUD BASE/BACKEND` como referência funcional se encontrar problemas com `BACKEND/`.
- Considere adicionar Flask-Migrate para gerir alterações no esquema do banco.
- Em produção, use um servidor WSGI (gunicorn) e um proxy reverso (nginx).

````
