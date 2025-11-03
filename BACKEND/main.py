from database.connection import Base, engine
from app.models.consulta import Consulta

if __name__ == "__main__":
    Base.metadata.create_all(bind=engine)
    print("Tabela 'consultas' criada com sucesso!")
