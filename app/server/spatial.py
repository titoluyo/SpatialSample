import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import Integer, create_engine, func
from sqlalchemy.orm import sessionmaker
from geoalchemy2.shape import to_shape
from shapely import wkb
from Departamento import Departamento, DepartamentoDto

app = FastAPI()

origins = [
    "http://localhost:8088",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# connString = 'postgresql://postgres:pub@localhost/spatialdb'
connString = 'postgresql://postgres:pub@db-postgis/spatialdb'
engine = create_engine(connString, echo=True)
Session = sessionmaker(bind=engine)
session = Session()

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/items/{item_id}")
async def read_item(item_id):
    return {"item_id": item_id}

@app.get("/departamentos/{gid}")
async def departamentos(gid):
    departamento = session.query(Departamento).filter_by(gid=gid).first()
    # mygeom = wkb(departamento.geom)
    data = session.query(
        Departamento.gid, 
        Departamento.departamen,
        func.ST_ASGeoJSON(Departamento.geom).label("geomJson")).filter_by(gid=gid).first()
    print(data)
    dto = DepartamentoDto(departamento)
    print(dto)
    print(type(departamento.geom))
    return data

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
