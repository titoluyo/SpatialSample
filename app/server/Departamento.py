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

class DepartamentoDto:
  def __init__(self, departamento: Departamento):
    self.gid = departamento.gid
    self.iddpto = departamento.iddpto
    self.departamen = departamento.departamen
    self.capital = departamento.capital
    self.fuente = departamento.fuente
    # self.geomJson = departamento.geom.ST_AsGeoJSON()