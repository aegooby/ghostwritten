
FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y curl unzip make ca-certificates certbot --no-install-recommends

# Certbot
VOLUME [ "/etc/letsencrypt/live", "/etc/letsencrypt/live" ]

# Deno
ENV DENO_INSTALL=/root/.deno
ENV PATH="$DENO_INSTALL/bin:$PATH"
ADD . .
RUN make install-deno
RUN make cache

# Server
CMD [ "make", "start-docker" ]
