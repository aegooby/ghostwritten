
FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y curl unzip make ca-certificates certbot --no-install-recommends

# Certbot
RUN sudo certbot certonly --standalone -d ghostwritten.me

# Deno
ENV DENO_INSTALL=/root/.deno
ENV PATH="$DENO_INSTALL/bin:$PATH"
ADD . .
RUN make install-deno
RUN make cache

# Server
CMD [ "make", "start-docker" ]
