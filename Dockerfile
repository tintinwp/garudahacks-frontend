FROM node:alpine3.18 as BUILD_IMAGE

WORKDIR /app

COPY . .

RUN npm install

RUN npm run build
FROM nginx:alpine as PRODUCTION_IMAGE
COPY --from=BUILD_IMAGE /app/dist /usr/share/nginx/html

COPY default.conf /etc/nginx/conf.d/

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]