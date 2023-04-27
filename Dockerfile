#Kuidas buildida:
#docker build -t word-cloud-frontend .
#docker tag word-cloud-frontend estken/word-cloud-frontend
#docker push estken/word-cloud-frontend

# Node.js LTS (Long Term Support) baasil põhinev image
FROM node:lts-alpine

# töökaust konteineris
WORKDIR /app

# koopia package.json ja package-lock.json failid töökausta
COPY package*.json ./

RUN npm install --legacy-peer-deps

# projekti failid konteinerisse
COPY . .

RUN npm run build

# Image, mis sisaldab NGINX-i
FROM nginx:stable-alpine

# Builditud React rakendus NGINX-i vaikimisi serveri kausta
COPY --from=0 /app/dist /usr/share/nginx/html

# pordi 80 eksport, et suhelda NGINX-iga
EXPOSE 80

# NGINX serveri käivitamine
CMD ["nginx", "-g", "daemon off;"]