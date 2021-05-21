
FROM aegooby/httpsaurus:base-latest AS ghostwritten

# Dokku
EXPOSE 5080

WORKDIR /root/ghostwritten
ADD . /root/ghostwritten
RUN build/linux upgrade

FROM ghostwritten AS localhost

CMD [ "build/linux", "docker", "--target", "localhost" ]

FROM ghostwritten AS dev

CMD [ "build/linux", "docker", "--target", "dev" ]

FROM ghostwritten AS live

CMD [ "build/linux", "docker", "--target", "live" ]
