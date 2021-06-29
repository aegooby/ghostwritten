
FROM aegooby/httpsaurus:base-latest AS ghostwritten

# Dokku
EXPOSE 3080

WORKDIR /root/ghostwritten
ADD . /root/ghostwritten
RUN build/linux upgrade

FROM ghostwritten AS localhost

CMD [ "build/linux", "docker", "--target", "localhost", "--domain", "localhost" ]

FROM ghostwritten AS dev

CMD [ "build/linux", "docker", "--target", "dev", "--domain", "www.dev.ghostwritten.me" ]

FROM ghostwritten AS live

CMD [ "build/linux", "docker", "--target", "live", "--domain", "www.ghostwritten.me" ]
