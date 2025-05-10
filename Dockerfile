FROM oven/bun:1.1.10 AS bun-build

WORKDIR /usr/src/app

COPY bun.lockb package.json ./

RUN bun install

RUN bun pm rebuild bcrypt || npm rebuild bcrypt

COPY . .

RUN bun run prisma:generate

RUN bun run build

CMD ["bun", "start"]
