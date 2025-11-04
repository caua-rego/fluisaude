import sqlite3
import os

DB_NAME = "fluisaude_simples.db"

def inicializar_banco():
    
    conn = sqlite3.connect(DB_NAME)
    cursor = conn.cursor()
    
    cursor.execute("""
    CREATE TABLE IF NOT EXISTS especialidades (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome_especialidade TEXT NOT NULL UNIQUE,
        descricao TEXT
    )
    """)
    
    conn.commit()
    return conn

def cadastrar_especialidade(conn):
    print("\n--- CADASTRAR NOVA ESPECIALIDADE ---")
    nome = input("Nome da especialidade: ").strip()
    descricao = input("Descrição (opcional): ").strip()

    if not nome:
        print("O nome é obrigatório. Operação cancelada.")
        return

    try:
        cursor = conn.cursor()
        cursor.execute("""
            INSERT INTO especialidades (nome_especialidade, descricao)
            VALUES (?, ?)
        """, (nome, descricao))
        conn.commit()
        print("Especialidade cadastrada com sucesso!\n")
    except sqlite3.IntegrityError:
        print("Erro: já existe uma especialidade com esse nome.")
    except Exception as e:
        print(f"Erro inesperado ao cadastrar: {e}")

def listar_especialidades(conn):
    print("\n--- LISTA DE ESPECIALIDADES CADASTRADAS ---")
    cursor = conn.cursor()
    
    cursor.execute("SELECT * FROM especialidades ORDER BY nome_especialidade")
    especialidades = cursor.fetchall()

    if not especialidades:
        print("Nenhuma especialidade cadastrada ainda.\n")
    else:
        for esp in especialidades:
            print(f"ID: {esp[0]} | Nome: {esp[1]} | Descrição: {esp[2] if esp[2] else 'Sem descrição'}")
    print("-" * 40)


def alterar_especialidade(conn):
    listar_especialidades(conn)
    
    try:
        esp_id = int(input("\nDigite o ID da especialidade que deseja alterar (ou 0 para cancelar): ").strip())
        if esp_id == 0:
            return
    except ValueError:
        print("ID inválido. Deve ser um número.")
        return

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM especialidades WHERE id = ?", (esp_id,))
    especialidade = cursor.fetchone()

    if not especialidade:
        print("Especialidade não encontrada.")
        return

    print("\nO que deseja alterar?")
    print("1 - Nome da especialidade")
    print("2 - Descrição")
    opcao = input("Escolha: ").strip()

    try:
        if opcao == "1":
            novo_nome = input("Novo nome: ").strip()
            if novo_nome:
                cursor.execute("UPDATE especialidades SET nome_especialidade = ? WHERE id = ?", (novo_nome, esp_id))
                conn.commit()
                print("Nome atualizado com sucesso!")
            else:
                print("Nome não pode ser vazio.")
        elif opcao == "2":
            nova_desc = input("Nova descrição: ").strip()
            cursor.execute("UPDATE especialidades SET descricao = ? WHERE id = ?", (nova_desc, esp_id))
            conn.commit()
            print("Descrição atualizada com sucesso!")
        else:
            print("Opção inválida.")
    except sqlite3.IntegrityError:
         print("Erro: Esse nome de especialidade já existe.")
    except Exception as e:
        print(f"Erro inesperado ao atualizar: {e}")

def excluir_especialidade(conn):
    listar_especialidades(conn)

    try:
        esp_id = int(input("\nDigite o ID da especialidade que deseja excluir (ou 0 para cancelar): ").strip())
        if esp_id == 0:
            return
    except ValueError:
        print("ID inválido. Deve ser um número.")
        return

    cursor = conn.cursor()
    cursor.execute("SELECT * FROM especialidades WHERE id = ?", (esp_id,))
    especialidade = cursor.fetchone()

    confirm = input(f"Tem certeza que deseja excluir o ID {esp_id}? (s/n): ").strip().lower()

    if confirm == 's':
        try:
            cursor = conn.cursor()
            cursor.execute("DELETE FROM especialidades WHERE id = ?", (esp_id,))
            conn.commit()
            
            if cursor.rowcount == 0:
                print("Nenhuma especialidade encontrada com esse ID.")
            else:
                print("Especialidade excluída com sucesso!")
        except Exception as e:
             print(f"Erro inesperado ao excluir: {e}")
    else:
        print("Exclusão cancelada.")

def menu():
    conn = inicializar_banco() 
    
    while True:
        print("\n========== MENU DE ESPECIALIDADES MÉDICAS ==========")
        print("1 - Cadastrar especialidade")
        print("2 - Listar especialidades")
        print("3 - Alterar especialidade")
        print("4 - Excluir especialidade")
        print("5 - Sair")

        opcao = input("Escolha uma opção: ").strip()

        if opcao == "1":
            cadastrar_especialidade(conn)
        elif opcao == "2":
            listar_especialidades(conn)
        elif opcao == "3":
            alterar_especialidade(conn)
        elif opcao == "4":
            excluir_especialidade(conn)
        elif opcao == "5":
            print("Encerrando...")
            conn.close()
            break
        else:
            print("Opção inválida. Tente novamente.")

if __name__ == "__main__":
    menu()