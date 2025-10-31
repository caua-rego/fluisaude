# FluiSaúde

## Descrição do Projeto

O **FluiSaúde** é um sistema de gerenciamento para Unidades Básicas de Saúde (UBS), desenvolvido como parte de um desafio acadêmico. O objetivo é otimizar e facilitar o agendamento de consultas e o gerenciamento de informações, melhorando o fluxo de atendimento e a organização da unidade.

## Prazo de Entrega

-   **Data:** 29/10/2025

## Desafio Escolhido

-   **Tema:** UBS - Unidade Básica de Saúde

## Componentes do Grupo

-   Cauã Rego Tavares Leite Duarte
-   Matheus Rodrigues Laré
-   Guilherme Alves
-   Fernando Andrade
-   João Pedro Cavalcanti de Souza
-   Gabriel Brito Ferreira Dias
-   Luis Felipe Farias Nunes
-   Renato Santos Chong

### Líder do Grupo

-   Cauã Rego Tavares Leite Duarte

## Repositório do Projeto

O código-fonte e o acompanhamento do desenvolvimento estão disponíveis no GitHub:
[github.com/caua-rego/fluisaude](https://github.com/caua-rego/fluisaude)

---

## Tecnologias Utilizadas (Backend)

O backend do projeto será desenvolvido com as seguintes tecnologias:

-   **Python:** Linguagem de programação principal para toda a lógica de negócio e construção do servidor.
-   **Flask:** Um micro-framework web para Python, utilizado para construir a API RESTful que servirá os dados para o cliente.
-   **SQLALCHEMY:** Um banco de dados relacional leve e baseado em arquivo, utilizado para o armazenamento e gerenciamento dos dados da aplicação.

---

## Funcionalidades (CRUDs)

O escopo inicial do projeto prevê a implementação de 4 operações de CRUD (Create, Read, Update, Delete) para as seguintes entidades do sistema:

1.  **CRUD de Pacientes:** Gerenciamento completo dos dados dos pacientes.
2.  **CRUD de Médicos:** Gerenciamento de profissionais de saúde e suas especialidades.
3.  **CRUD de Consultas:** Agendamento, visualização, atualização e cancelamento de consultas.
4.  **CRUD de Especialidades:** Cadastro e gerenciamento das especialidades médicas disponíveis. (Matheus Laré; Luís Nunes)

## Como rodar o projeto integrado (backend + frontend)

Se você quer servir o frontend junto com o backend (mesmo servidor), siga estes passos rápidos:

1. Construa o frontend (na pasta `FRONTEND`):

```bash
cd FRONTEND
npm install
npm run build
```

2. Copie os arquivos gerados (`dist/`) para o backend (exemplo):

```bash
mkdir -p "CRUD BASE/BACKEND/app/static/app"
rsync -a --delete FRONTEND/dist/ "CRUD BASE/BACKEND/app/static/app/"
```

3. Inicie o backend (use o virtualenv):

```bash
cd "CRUD BASE/BACKEND"
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python run.py  # por padrão o projeto usa 5001 para evitar conflitos locais
```

4. Abra `http://localhost:5001/` para ver o frontend servido pelo Flask. O dashboard simples também está disponível em `/dashboard`.

Observação: o cliente já foi atualizado para usar chamadas relativas à API (`/api`) para que o build funcione quando servido pelo mesmo host.

---

## Padrões de Código (Python)

### Nomenclatura de Classes: `PascalCase`

Para manter a consistência e a legibilidade do código, adotamos o padrão **PascalCase** para a nomeação de classes em Python.

**O que é PascalCase?**
PascalCase (também conhecido como UpperCamelCase) é uma convenção de nomenclatura onde a primeira letra de cada palavra em um nome composto é capitalizada, sem espaços ou pontuações.

**Aplicação:**
Todas as classes declaradas no projeto devem seguir este padrão.

-   **Exemplos:** `PacienteModel`, `ConsultaController`, `AgendamentoService`.

```python
# Correto - Usando PascalCase para o nome da classe
class PacienteController:
    def __init__(self, nome, cpf):
        self.nome = nome
        self.cpf = cpf

    def salvar_paciente(self):
        # Lógica para salvar o paciente
        pass

# Incorreto
class paciente_controller:
    def __init__(self, nome, cpf):
        pass
