FROM oven/bun:1

WORKDIR /app

COPY . .

RUN bun install

RUN bun run build

FROM nginx

COPY --from=0 /app/dist /usr/share/nginx/html

COPY nginx.conf /etc/nginx/nginx.conf