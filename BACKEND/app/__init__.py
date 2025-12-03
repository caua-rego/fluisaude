from flask import Flask
from flask import send_from_directory, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flasgger import Swagger
from sqlalchemy.exc import SQLAlchemyError
from werkzeug.exceptions import HTTPException
import logging
import os

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('database.DevelopmentConfig')

    log_level = app.config.get('LOG_LEVEL', logging.INFO)
    logging.basicConfig(level=log_level)
    app.logger.setLevel(log_level)

    CORS(app)
    db.init_app(app)

    swagger_template = {
        'swagger': '2.0',
        'info': {
            'title': 'FluiSaude API',
            'description': 'Documentacao interativa dos endpoints CRUD da aplicacao.',
            'version': '1.0.0',
        },
        'basePath': '/api',
    }

    swagger_config = {
        'headers': [],
        'specs': [
            {
                'endpoint': 'apispec_1',
                'route': '/api/docs.json',
                'rule_filter': lambda rule: rule.rule.startswith('/api'),
                'model_filter': lambda tag: True,
            }
        ],
        'static_url_path': '/flasgger_static',
        'swagger_ui': True,
        'specs_route': '/api/docs/',
    }

    Swagger(app, config=swagger_config, template=swagger_template)

    from .routes.pacientes import pacientes_bp
    from .routes.especialidades import especialidades_bp
    from .routes.consultas import consulta_bp
    from .routes.medico import medico_bp

    app.register_blueprint(pacientes_bp, url_prefix='/api/pacientes')
    app.register_blueprint(especialidades_bp, url_prefix='/api/especialidades')
    app.register_blueprint(consulta_bp, url_prefix='/api/consultas')
    app.register_blueprint(medico_bp, url_prefix='/api/medicos')

    with app.app_context():
        db.create_all()

    frontend_folder = os.path.join(app.root_path, 'static', 'app')

    def serve_frontend(filename: str = 'index.html'):
        asset_path = os.path.join(frontend_folder, filename)
        if os.path.exists(asset_path):
            return send_from_directory(frontend_folder, filename)
        return (
            'Build do frontend não encontrado. Rode "npm run build" em frontend/ e sincronize para app/static/app.',
            404,
        )

    @app.route('/')
    def index():
        return serve_frontend()

    @app.route('/<path:filename>')
    def app_static(filename):
        if filename.startswith('api/'):
            return ('', 404)

        asset_path = os.path.join(frontend_folder, filename)
        if os.path.exists(asset_path):
            return send_from_directory(frontend_folder, filename)

        return serve_frontend()

    @app.errorhandler(404)
    def handle_not_found(error):
        if request.path.startswith('/api'):
            return jsonify({'error': 'Recurso não encontrado'}), 404
        return error

    @app.errorhandler(SQLAlchemyError)
    def handle_database_error(error):
        app.logger.exception('Erro ao acessar o banco de dados')
        return jsonify({'error': 'Erro interno ao acessar o banco de dados'}), 500

    @app.errorhandler(Exception)
    def handle_unexpected_error(error):
        if isinstance(error, HTTPException):
            return error
        app.logger.exception('Erro inesperado na aplicação')
        if request.path.startswith('/api'):
            return jsonify({'error': 'Erro interno do servidor'}), 500
        return ('Erro interno do servidor', 500)

    return app
