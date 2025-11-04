# main.py

from app import create_app

# Cria uma instância da aplicação Flask utilizando a função factory `create_app`.
# Isso garante que a aplicação seja configurada corretamente com todas as suas extensões e rotas.
app = create_app()

# O bloco `if __name__ == '__main__'` garante que o código dentro dele só será executado
# quando o script `main.py` for rodado diretamente (e não quando for importado por outro script).
if __name__ == '__main__':
    # Inicia o servidor de desenvolvimento do Flask.
    # `debug=True` ativa o modo de depuração, que reinicia o servidor automaticamente após alterações no código
    # e fornece páginas de erro detalhadas.
    # `host='0.0.0.0'` faz com que o servidor seja acessível a partir de qualquer endereço de IP,
    # o que é útil para testes em outros dispositivos na mesma rede.
    app.run(host='0.0.0.0', port=5001, debug=True)