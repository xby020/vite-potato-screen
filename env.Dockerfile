FROM node:16
COPY package.json /usr/src/www/package.json
WORKDIR /usr/src/www
RUN npm --registry https://registry.npm.taobao.org install
