"""
FluiSaúde - Application factory and database setup
"""
from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    
    from database import DATABASE_URL
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
    app.config['SQLALCHEMY_ENGINE_OPTIONS'] = {
        'pool_pre_ping': True,
        'connect_args': {
            'connect_timeout': 5
        }
    }
    
    db.init_app(app)
    
    from routes.consulta_routes import consulta_bp
    app.register_blueprint(consulta_bp, url_prefix="/consultas")
    
    with app.app_context():
        try:
            db.create_all()
            print("Conexão com o banco de dados bem-sucedida!")
        except Exception as e:
            print(f"Aviso: Não foi possível conectar ao banco de dados: {e}")
            print("O aplicativo iniciará, mas as operações de banco de dados falharão.")
    
    return app
