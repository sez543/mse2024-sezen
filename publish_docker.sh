version="latest"

echo "Publishing v$version"

echo "Removing old images"
docker image remove mse_2024_sezen_be
docker image remove mse_2024_sezen_fe

echo "Building new images"
docker build --no-cache -t sez54321/mse_2024_sezen_be:$version -f ./Dockerfile.be .
docker build --no-cache -t sez54321/mse_2024_sezen_fe:$version -f ./Dockerfile.fe .

echo "Publish to Dockerhub"
docker push sez54321/mse_2024_sezen_be:$version
docker push sez54321/mse_2024_sezen_fe:$version