#!/bin/bash
set -e

echo '# docker compose up'
#docker-compose -f docker-compose.yml -f docker-compose.debug.yml up -d
docker-compose up -d
echo "waiting..."
sleep 15
echo "setup postgis..."
if ! docker exec spatialdb psql -U postgres -c "\l" | grep spatialdb; then
    docker exec spatialdb createdb --username=postgres spatialdb
fi
if ! docker exec spatialdb psql --username=postgres -d spatialdb -t -c "SELECT extname FROM pg_extension WHERE extname='postgis';" | grep postgis; then
    docker exec spatialdb psql --username=postgres -d spatialdb -c "CREATE EXTENSION postgis;"
fi
if ! docker exec spatialdb psql --username=postgres -d spatialdb -t -c "SELECT extname FROM pg_extension WHERE extname='postgis_topology';" | grep postgis_topology; then
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
# if ! docker exec spatialdb psql -U postgres -d spatialdb -c "\dt" | grep usa_counties; then
#     echo "loading USA_COUNTIES"
#     docker exec -i spatialdb bash -c "shp2pgsql /geodata/USA_shp/USA_counties.shp public.usa_counties | psql -h localhost -d spatialdb -U postgres"
# fi
# if ! docker exec spatialdb psql -U postgres -d spatialdb -c "\dt" | grep world_countries; then
#     echo "loading WORLD_COUNTRIES"
#     docker exec -i spatialdb bash -c "shp2pgsql /geodata/World_Countries/World_Countries.shp public.world_countries | psql -h localhost -d spatialdb -U postgres"
# fi
