FROM node:18-alpine AS build

WORKDIR /app
COPY package.json ./
RUN npm install
COPY . ./
RUN npm run build


FROM nginx:1.24.0-alpine-slim as release
COPY --from=build /app/dist /usr/share/nginx/html/
ENV NODE_ENV development
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]