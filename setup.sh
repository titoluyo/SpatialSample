wget https://raw.githubusercontent.com/GitHub30/gdrive.sh/master/gdrive.sh
curl gdrive.sh | bash -s 14JjsYRzPOEHeeiXmEAZaN_PTWzBFHc2g
tar -xvzf geodata.tar.gz
docker-compose up -d
# docker cp geodata spatialdb:/
# docker exec spatialdb apt update
# docker exec spatialdb apt install -y postgis
echo "waiting..."
sleep 20
echo "setup postgis..."
docker exec spatialdb createdb --username=postgres spatialdb
docker exec spatialdb psql --username=postgres -d spatialdb -c "CREATE EXTENSION postgis;"
docker exec spatialdb psql --username=postgres -d spatialdb -c "CREATE EXTENSION postgis_topology;"
echo "loading maps ..."
docker exec -i spatialdb bash -c "shp2pgsql /geodata/departamentos/DEPARTAMENTOS.shp public.departamentos | psql -h localhost -d spatialdb -U postgres"
docker exec -i spatialdb bash -c "shp2pgsql /geodata/provincias/PROVINCIAS.shp public.provincias | psql -h localhost -d spatialdb -U postgres"
docker exec -i spatialdb bash -c "shp2pgsql /geodata/distritos/DISTRITOS.shp public.distritos | psql -h localhost -d spatialdb -U postgres"
docker exec -i spatialdb bash -c "shp2pgsql /geodata/USA_shp/USA_counties.shp public.usa_counties | psql -h localhost -d spatialdb -U postgres"
docker exec -i spatialdb bash -c "shp2pgsql /geodata/World_Countries/World_Countries.shp public.world_countries | psql -h localhost -d spatialdb -U postgres"

