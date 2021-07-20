
FROM aegooby/turtle:latest AS ghostwritten

# Dokku
EXPOSE 3080

WORKDIR /root/ghostwritten
ADD . /root/ghostwritten
RUN cli/install.sh
RUN turtle upgrade
RUN turtle cache

FROM ghostwritten AS localhost

RUN turtle clean --dist
RUN turtle docker:bundle --target localhost
CMD [ "turtle", "docker:server", "--domain", "localhost" ]

FROM ghostwritten AS dev

RUN turtle clean --dist
RUN turtle docker:bundle --target dev
CMD [ "turtle", "docker:server", "--domain", "www.dev.ghostwritten.io" ]

FROM ghostwritten AS live

RUN turtle clean --dist
RUN turtle docker:bundle --target live
CMD [ "turtle", "docker:server", "--domain", "www.ghostwritten.io" ]
