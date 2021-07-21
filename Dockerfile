
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
RUN turtle bundle --graphql http://localhost/graphql
CMD [ "turtle", "deploy:server", "--domain", "localhost" ]

FROM ghostwritten AS dev

RUN turtle clean --dist
RUN turtle bundle --graphql https://www.dev.ghostwritten.io/graphql
CMD [ "turtle", "deploy:server", "--domain", "www.dev.ghostwritten.io" ]

FROM ghostwritten AS live

RUN turtle clean --dist
RUN turtle bundle --graphql https://www.ghostwritten.io/graphql
CMD [ "turtle", "deploy:server", "--domain", "www.ghostwritten.io" ]
