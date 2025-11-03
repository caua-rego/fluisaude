from sqlalchemy import Column, Integer, String
from database.connection import Base

class Consulta(Base):
    __tablename__ = "consultas"

    id = Column(Integer, primary_key=True, index=True)
    paciente_nome = Column(String, nullable=False)
    medico_nome = Column(String, nullable=False)
    especialidade = Column(String, nullable=False)
    horario = Column(String, nullable=False)
