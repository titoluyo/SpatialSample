from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import psycopg2
from postgis.psycopg import register
from postgis import LineString, Point, Polygon, MultiLineString, MultiPolygon


connection = psycopg2.connect("host=localhost port=5433 dbname=spatialdb user=postgres password=pub")
register(connection)

app = Flask(__name__)

CORS(app)
app.config["DEBUG"] = True

@app.route("/heartbeat")
def heartbeat():
    return jsonify({"status": "healthy"})

@app.route("/")
def hello():
    message = "Spatial Sample"
    return render_template('index.html', message=message)

@app.route("/location", methods=['POST'])
def location():
    loc = {
        'lat': request.json['lat'],
        'lng': request.json['lng'],
    }


def departamentos(gid):
    cursor = connection.cursor()
    cursor.execute(f'SELECT geom FROM departamentos WHERE gid = {gid};')
    geom = cursor.fetchone()[0]
    dep = geom.geojson
    cursor.close()
    return jsonify(dep)


def provincias(iddpto):
    print(f'provincias, iddpto:{iddpto}')
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


# app.add_url_rule('/', 'index', index)
app.add_url_rule('/departamentos/<int:gid>', 'departamentos', departamentos)
app.add_url_rule('/provincias/<iddpto>', 'provincias', provincias)

# app.view_functions['index'] = index

if __name__ == "__main__":
    app.run(host='0.0.0.0')
    connection.close()
