# FROM node:alpine AS frontend
# WORKDIR /app
# COPY . .
# RUN npm install
# RUN npm install -g @angular/cli
# EXPOSE 4200
# CMD ["ng", "serve", "--host", "0.0.0.0"]


FROM nginx:alpine
WORKDIR /var/www/html
# RUN npm run build --prod
COPY ./frontend/dist/frontend . 
COPY ./nginx.conf /etc/nginx/conf.d/default.conf