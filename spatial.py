import flask
from flask import request, jsonify
from flask_cors import CORS
import psycopg2
from postgis.psycopg import register
from postgis import LineString, Point, Polygon, MultiLineString, MultiPolygon


connection = psycopg2.connect("host=localhost port=5433 dbname=spatialdb user=postgres password=P@xxw0rd")
register(connection)

app = flask.Flask(__name__)
CORS(app)
app.config["DEBUG"] = True

print(__name__)


def index():
    return "Hello World"


def departamentos(gid):
    cursor = connection.cursor()
    cursor.execute(f'SELECT geom FROM departamentos WHERE gid = {gid};')
    geom = cursor.fetchone()[0]
    dep = geom.geojson
    cursor.close()
    return jsonify(dep)


def provincias(iddpto):
    cursor = connection.cursor()
    strsql = f"SELECT ST_ForcePolygonCW(geom), provincia FROM provincias WHERE iddpto = '{iddpto}';";
    cursor.execute(strsql)
    result = cursor.fetchall()

    cursor.close()
    coll = dict()

    coll['type'] = 'FeatureCollection'
    coll['features'] = [{'type': 'Feature', 'geometry': a[0].geojson, 'properties': {'name': a[1]}} for a in result]

    # return jsonify([a[0].geojson for a in result])
    # return jsonify(result.geojson)
    return jsonify(coll)


app.add_url_rule('/', 'index', index)
app.add_url_rule('/departamentos/<int:gid>', 'departamentos', departamentos)
app.add_url_rule('/provincias/<iddpto>', 'provincias', provincias)

# app.view_functions['index'] = index

app.run()

connection.close()
