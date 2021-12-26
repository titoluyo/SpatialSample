# # req (virtualenv)
# https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/
# windows
# py -m pip install --upgrade pip     # upgrade pip
# py -m pip --version                 # check pip version
# py -m pip install --user virtualenv # install virtualenv
# py -m venv spatial                  # create virtualenv "spatial"
# .\env\Scripts\activate              # activate virtualenv



# # req (psycopg2)
# sudo apt-get install --reinstall libpq-dev

safe_workon() {
  source "./$1/Scripts/activate"
}
if ! [ -f gdrive.sh ]; then
    echo '# downloading gdrive.sh ...'
    wget https://raw.githubusercontent.com/GitHub30/gdrive.sh/master/gdrive.sh
fi
if ! [ -f geodata.tar.gz ]; then
    echo '# downloading maps compressed file ...'
    curl gdrive.sh | bash -s 14JjsYRzPOEHeeiXmEAZaN_PTWzBFHc2g
fi
if ! [ -d geodata ]; then
    tar -xvzf geodata.tar.gz
fi
# if ! [ -d ~/.virtualenvs/spatial ]; then
#     virtualenv -p `which python3` ~/.virtualenvs/spatial
# fi
sleep 5
# echo '# activating virtual env spatial'
# safe_workon spatial
# echo '# installing requirements ...'
# pip install -r app/server/requirements.txt

echo '# docker compose up'
#docker-compose -f docker-compose.yml -f docker-compose.debug.yml up -d
docker-compose up -d
echo "waiting..."
sleep 10
echo "setup postgis..."
if ! docker exec spatialdb psql -U postgres -c "\l" | grep spatialdb; then
    docker exec spatialdb createdb --username=postgres spatialdb
    docker exec spatialdb psql --username=postgres -d spatialdb -c "CREATE EXTENSION postgis;"
    docker exec spatialdb psql --username=postgres -d spatialdb -c "CREATE EXTENSION postgis_topology;"
fi
echo "loading maps ..."
if ! docker exec spatialdb psql -U postgres -d spatialdb -c "\dt" | grep departamentos; then
    echo "loading DEPARTAMENTOS"
    docker exec -i spatialdb bash -c "shp2pgsql /geodata/departamentos/DEPARTAMENTOS.shp public.departamentos | psql -h localhost -d spatialdb -U postgres"
fi
if ! docker exec spatialdb psql -U postgres -d spatialdb -c "\dt" | grep provincias; then
    echo "loading PROVINCIAS"
    docker exec -i spatialdb bash -c "shp2pgsql /geodata/provincias/PROVINCIAS.shp public.provincias | psql -h localhost -d spatialdb -U postgres"
fi
if ! docker exec spatialdb psql -U postgres -d spatialdb -c "\dt" | grep distritos; then
    echo "loading DISTRITOS"
    docker exec -i spatialdb bash -c "shp2pgsql /geodata/distritos/DISTRITOS.shp public.distritos | psql -h localhost -d spatialdb -U postgres"
fi
if ! docker exec spatialdb psql -U postgres -d spatialdb -c "\dt" | grep usa_counties; then
    echo "loading USA_COUNTIES"
    docker exec -i spatialdb bash -c "shp2pgsql /geodata/USA_shp/USA_counties.shp public.usa_counties | psql -h localhost -d spatialdb -U postgres"
fi
if ! docker exec spatialdb psql -U postgres -d spatialdb -c "\dt" | grep world_countries; then
    echo "loading WORLD_COUNTRIES"
    docker exec -i spatialdb bash -c "shp2pgsql /geodata/World_Countries/World_Countries.shp public.world_countries | psql -h localhost -d spatialdb -U postgres"
fi
