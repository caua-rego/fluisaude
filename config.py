# config.py

import os

# Obtém o diretório base da aplicação.
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    """
    Configurações base que são compartilhadas entre todos os ambientes (desenvolvimento, produção, etc.).
    """
    # Chave secreta para proteger a aplicação contra ataques como CSRF.
    # Em um ambiente de produção, esta chave deve ser mais complexa e mantida em segredo.
    SECRET_KEY = os.environ.get('SECRET_KEY') or 'uma-chave-secreta-muito-dificil-de-adivinhar'
    
    # Desativa o rastreamento de modificações do SQLAlchemy para economizar recursos.
    # A lógica de rastreamento de alterações será gerenciada manualmente quando necessário.
    SQLALCHEMY_TRACK_MODIFICATIONS = False

class DevelopmentConfig(Config):
    """
    Configurações específicas para o ambiente de desenvolvimento.
    """
    # Ativa o modo de depuração do Flask, que fornece informações detalhadas sobre erros.
    DEBUG = True
    
    # Define o caminho para o banco de dados SQLite.
    # O banco de dados será armazenado no diretório 'instance' da aplicação.
    SQLALCHEMY_DATABASE_URI = 'sqlite:///' + os.path.join(basedir, 'instance', 'banco_de_dados.db')

class ProductionConfig(Config):
    """
    Configurações para o ambiente de produção.
    """
    # O modo de depuração deve ser sempre desativado em produção por razões de segurança.
    DEBUG = False
    
    # Em produção, é comum usar um banco de dados mais robusto, como PostgreSQL ou MySQL.
    # A URI do banco de dados seria obtida de variáveis de ambiente.
    SQLALCHEMY_DATABASE_URI = os.environ.get('DATABASE_URL') or 'sqlite:///' + os.path.join(basedir, 'instance', 'banco_de_dados.db')
