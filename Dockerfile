
FROM ubuntu:latest

RUN apt-get update
RUN apt-get install -y curl unzip make ca-certificates certbot nodejs npm --no-install-recommends

# Certbot
# VOLUME [ "/etc/letsencrypt/" ]

# Deno
ENV DENO_INSTALL=/root/.deno
ENV PATH="$DENO_INSTALL/bin:$PATH"
ADD . .
RUN make install

# Server
RUN make cache
RUN make bundle
CMD [ "make", "release" ]
