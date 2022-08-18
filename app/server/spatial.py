import uvicorn
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from geoalchemy2.shape import to_shape
from Departamento import Departamento
from shapely.geometry import MultiPolygon, Polygon
from geojson import Feature

if __name__ == "__main__":
    host = 'localhost'
else:
    host = 'db-postgis'

app = FastAPI()

origins = [
    "http://localhost:8088",
    "http://localhost:3000",
    "http://localhost:5173",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# connString = 'postgresql://postgres:pub@localhost/spatialdb'
connString = f'postgresql://postgres:pub@{host}/spatialdb'
engine = create_engine(connString, echo=True)
Session = sessionmaker(bind=engine)
session = Session()


@app.get("/")
async def root():
    return {"message": "Hello World"}


@app.get("/demo/{demo_id}")
async def read_item(demo_id: str):
    return {"demo_id": demo_id}


@app.get("/departamentos/{gid}")
async def departamentos(gid: str):
    departamento: Departamento = session.query(Departamento).filter_by(gid=gid).first()
    geometry: [MultiPolygon, Polygon] = to_shape(departamento.geom)
    feature: Feature = Feature(
        geometry=geometry,
        properties={
            "id": departamento.gid,
            "departamento": departamento.departamen
        })
    return feature

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)
