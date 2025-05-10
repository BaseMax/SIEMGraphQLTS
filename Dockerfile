FROM oven/bun:1.1.10 AS bun-build
WORKDIR /usr/src/app
COPY . .
RUN bun install
RUN bun run prisma:generate
RUN bun run build
CMD ["bun", "start"]
