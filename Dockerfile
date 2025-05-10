FROM oven/bun:1.1.10 AS bun-build

WORKDIR /usr/src/app

COPY bun.lock package.json ./

RUN bun install

COPY . .

RUN bun pm rebuild bcrypt || npm rebuild bcrypt

RUN bun run prisma:generate

RUN bun run build

CMD ["bun", "start"]
