docker build -t word-cloud-frontend:latest .
docker tag word-cloud-frontend estken/word-cloud-frontend
docker push estken/word-cloud-frontend