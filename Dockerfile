
FROM aegooby/httpsaurus:base-latest AS ghostwritten

# Dokku
EXPOSE 5080

WORKDIR /root/ghostwritten
ADD . /root/ghostwritten
RUN build/linux upgrade

FROM ghostwritten AS dev

CMD [ "build/linux", "remote", "--target", "dev" ]

FROM ghostwritten AS live

CMD [ "build/linux", "remote", "--target", "live" ]
