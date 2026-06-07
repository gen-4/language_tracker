FROM node:22-alpine AS builder

WORKDIR app

RUN npm install -g @angular/cli@21.1.4

COPY . .

RUN npm ci
RUN ng build --configuration production


FROM nginx:alpine

COPY --from=builder /app/dist/language_frontend/browser /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
