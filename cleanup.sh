rm -rf ~/.virtualenvs/spatial
rm -rf geodata
rm gdrive.sh
rm geodata.tar.gz
docker-compose down
docker volume rm spatial_pg-data