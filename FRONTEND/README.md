# FluiSaúde - Frontend

Este é o frontend da aplicação FluiSaúde, uma interface moderna e intuitiva para gerenciar agendamentos e informações de saúde.

## Tecnologias

*   React
*   TypeScript
*   Tailwind CSS
*   Vite
*   React Router DOM

## Como Iniciar

1.  Clone o repositório:
    ```bash
    git clone https://github.com/caua-rego/fluisaude.git
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Execute o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

## Estrutura de Rotas

*   **`/`**: Página inicial da aplicação.
*   **`/dashboard`**: Painel principal com navegação para os módulos CRUD.
    *   **`/dashboard/pacientes`**: Gerenciamento de pacientes.
    *   **`/dashboard/medicos`**: Gerenciamento de médicos.
    *   **`/dashboard/consultas`**: Gerenciamento de consultas.
    *   **`/dashboard/especialidades`**: Gerenciamento de especialidades.
