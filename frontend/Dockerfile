FROM node:alpine AS frontend
WORKDIR /app
COPY . .
RUN npm install
RUN npm install -g @angular/cli
CMD     ["ng", "serve", "--host", "127.0.0.1"]
# RUN npm run build --prod
# FROM nginx:alpine
# COPY --from=frontend /app/dist/frontend /usr/share/nginx/html
EXPOSE 4200