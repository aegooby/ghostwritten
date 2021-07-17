
FROM aegooby/httpsaurus:base-latest AS ghostwritten

# Dokku
EXPOSE 3080

WORKDIR /root/ghostwritten
ADD . /root/ghostwritten
RUN cli/install.sh
RUN deno-cli upgrade

FROM ghostwritten AS localhost

CMD [ "deno-cli", "docker", "--target", "localhost", "--domain", "localhost" ]

FROM ghostwritten AS dev

CMD [ "deno-cli", "docker", "--target", "dev", "--domain", "www.dev.ghostwritten.io" ]

FROM ghostwritten AS live

CMD [ "deno-cli", "docker", "--target", "live", "--domain", "www.ghostwritten.io" ]
