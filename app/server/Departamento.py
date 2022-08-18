from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String
from geoalchemy2 import Geometry

Base = declarative_base()


class Departamento(Base):
    __tablename__ = 'departamentos'
    gid = Column(Integer, primary_key=True)
    iddpto = Column(String)
    departamen = Column(String)
    capital = Column(String)
    fuente = Column(String)
    geom = Column(Geometry('MULTIPOLYGON'))

