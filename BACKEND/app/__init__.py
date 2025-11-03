from flask import Flask
from flask_cors import CORS

def create_app():
    app = Flask(__name__)
    CORS(app)

    # Importar e registrar blueprints
    from app.routes.consultas import consultas_bp
    app.register_blueprint(consultas_bp, url_prefix='/consultas')

    return app