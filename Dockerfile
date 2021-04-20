
FROM ubuntu:latest AS dev

# Setup
RUN apt-get update
RUN apt-get install -y curl unzip make ca-certificates certbot nodejs npm --no-install-recommends

# Deno
ENV DENO_INSTALL=/root/.deno
ENV PATH="$DENO_INSTALL/bin:$PATH"
ADD . /root/ghostwritten
WORKDIR /root/ghostwritten
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

CMD [ "build/linux", "remote", "--target", "dev" ]

FROM ubuntu:latest AS live

# Setup
RUN apt-get update
RUN apt-get install -y curl unzip make ca-certificates certbot nodejs npm --no-install-recommends

# Deno
ENV DENO_INSTALL=/root/.deno
ENV PATH="$DENO_INSTALL/bin:$PATH"
ADD . /root/ghostwritten
WORKDIR /root/ghostwritten
RUN curl -fsSL https://deno.land/x/install/install.sh | sh

CMD [ "build/linux", "remote", "--target", "live" ]
