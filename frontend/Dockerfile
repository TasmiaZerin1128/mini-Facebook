FROM node:alpine AS frontend
WORKDIR /app
COPY . .
EXPOSE 4200
RUN npm install
RUN npm install -g @angular/cli

CMD     ["ng", "serve", "--host", "0.0.0.0"]
# RUN npm run build --prod
# FROM nginx:alpine
# COPY --from=frontend /app/dist/frontend /usr/share/nginx/html