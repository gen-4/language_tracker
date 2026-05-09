FROM debian:latest


RUN mkdir /language_tracker
RUN mkdir /var/log/language_tracker

WORKDIR /language_tracker
COPY _build/prod/rel/api .
COPY entrypoint.sh .

RUN apt update -y && apt install ca-certificates -y \
    libncurses-dev \
    libncurses6 \
    libstdc++6 \
    openssl \
    && rm -rf /var/lib/apt/lists/*

ENTRYPOINT ["./entrypoint.sh"]
