FROM elixir:1.17 AS builder

WORKDIR /app
COPY . .

RUN mix deps.get
RUN MIX_ENV=prod mix release


FROM debian:latest

RUN mkdir /language_tracker
RUN mkdir /var/log/language_tracker

RUN apt update -y && apt install ca-certificates -y \
    libncurses-dev \
    libncurses6 \
    libstdc++6 \
    openssl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /language_tracker

COPY --from=builder /app/_build/prod/rel/api ./

ENTRYPOINT ["./entrypoint.sh"]
