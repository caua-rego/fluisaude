from flask import Flask
from flask import send_from_directory
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flasgger import Swagger

db = SQLAlchemy()

def create_app():
    app = Flask(__name__, instance_relative_config=True)
    app.config.from_object('config.DevelopmentConfig')

    CORS(app)

    db.init_app(app)

    app.config['SWAGGER'] = {
        'title': 'FluiSaude API',
        'uiversion': 3,
    }

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

    with app.app_context():
        from .routes.pacientes import pacientes_bp
        from .routes.medicos import medicos_bp
        from .routes.especialidades import especialidades_bp
        from .routes.consultas import consulta_bp

        app.register_blueprint(pacientes_bp, url_prefix='/api')
        app.register_blueprint(medicos_bp, url_prefix='/api')
        app.register_blueprint(especialidades_bp, url_prefix='/api')
        app.register_blueprint(consulta_bp, url_prefix='/api/consultas')

        db.create_all()

    # Serve dashboard static page at /dashboard
    @app.route('/dashboard')
    def dashboard():
        # static files are located in app/static/
        return send_from_directory('static/dashboard', 'index.html')

    # Optional: serve any nested assets under /dashboard/
    @app.route('/dashboard/<path:filename>')
    def dashboard_assets(filename):
        return send_from_directory('static/dashboard', filename)

    # Serve built frontend (Vite) placed in app/static/app at the application root
    import os

    @app.route('/')
    def index():
        return send_from_directory('static/app', 'index.html')

    @app.route('/<path:filename>')
    def app_static(filename):
        # Avoid catching API routes (they are registered under /api)
        if filename.startswith('api/'):
            return ('', 404)

        static_path = os.path.join(app.root_path, 'static', 'app', filename)
        if os.path.exists(static_path):
            return send_from_directory('static/app', filename)

        # For SPA routes, return index.html so client-side routing works
        return send_from_directory('static/app', 'index.html')

    return app
