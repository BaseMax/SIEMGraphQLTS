FROM oven/bun:1.2.12 AS bun-build

WORKDIR /usr/src/app

RUN apt-get update -y && apt-get install -y openssl

COPY bun.lock package.json ./

RUN bun install

COPY . .

RUN bun run prisma:generate

RUN bun run build
