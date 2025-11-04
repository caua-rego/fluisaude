from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flasgger import Swagger

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    
    # Carrega a configuração do arquivo config.py na raiz do BACKEND
    app.config.from_object('config.DevelopmentConfig')

    # Inicializa as extensões
    CORS(app)
    db.init_app(app)

    # Configura o Flasgger para a documentação da API
    app.config['SWAGGER'] = {
        'title': 'FluiSaude API',
        'uiversion': 3
    }
    Swagger(app)

    with app.app_context():
        # Importa os blueprints (rotas)
        from .routes.pacientes import pacientes_bp
        from .routes.medicos import medicos_bp
        from .routes.especialidades import especialidades_bp
        from .routes.consultas import consulta_bp

        # Registra os blueprints na aplicação
        app.register_blueprint(pacientes_bp, url_prefix='/api')
        app.register_blueprint(medicos_bp, url_prefix='/api')
        app.register_blueprint(especialidades_bp, url_prefix='/api')
        app.register_blueprint(consulta_bp, url_prefix='/api')

        # Cria as tabelas do banco de dados se não existirem
        db.create_all()

    return app
