FROM node:latest AS builder

WORKDIR /usr/src/app

COPY . .
RUN npm install
RUN ng build --prod

FROM nginx:1.17
COPY --from=builder /usr/src/app/dist/app-name /usr/share/nginx/html
COPY ./nginx-angular.conf /etc/nginx/conf.d/default.conf
