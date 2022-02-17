#################################################################################
#Objeto:  (Bancos)
#Funcionalidad: confirmacion de orden de pago spei (Bancos)
#Sistema: BANCO
#Fecha de Creación: 03/JuLIO/2019
#Autor: Eduardo Natanael Castillo Caballero [encastillo@frd.org.mx]
#Actualizaciones: 
#Versión: 1.0
#################################################################################
FROM node:12.2.0

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY imagen/package*.json ./

RUN npm install
# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
COPY imagen .

ENV         TZ                America/Mexico_City
RUN         ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

EXPOSE 8080
CMD [ "npm", "start" ]