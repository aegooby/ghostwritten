
FROM aegooby/httpsaurus:base-latest AS ghostwritten

WORKDIR /root/ghostwritten
ADD . /root/ghostwritten
RUN deno upgrade

FROM ghostwritten AS dev

CMD [ "build/linux", "remote", "--target", "dev" ]

FROM ghostwritten AS live

CMD [ "build/linux", "remote", "--target", "live" ]
