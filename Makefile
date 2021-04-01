
# ------------------------------------------------------------------------------
# Default
# ------------------------------------------------------------------------------
version:
	@echo "\033[0;30mGhost\033[0mwritten v1.0.7"
	@echo "\033[0;1mhttps\033[0maurus v1.0.0"

# ------------------------------------------------------------------------------
# Reset
# ------------------------------------------------------------------------------
clean:
	rm -rf .cache/ .dist/ node_modules/

# ------------------------------------------------------------------------------
# Deno
# ------------------------------------------------------------------------------
install:
	hash deno || curl -fsSL https://deno.land/x/install/install.sh | sh
	hash yarn || npm install --global yarn

upgrade:
	deno upgrade

# ------------------------------------------------------------------------------
# Setup
# ------------------------------------------------------------------------------
cache: export DENO_DIR=.cache/
cache: upgrade
	mkdir -p .cache/
	deno --unstable cache **/*.tsx
	yarn install

bundle: export DENO_DIR=.cache/
bundle: upgrade cache
	mkdir -p .dist/
	deno --unstable bundle --config client/tsconfig.json https://esm.sh/@stripe/stripe-js .dist/stripe.bundle.js
	deno --unstable bundle --config client/tsconfig.json client/bundle.tsx .dist/deno.bundle.js

# ------------------------------------------------------------------------------
# Run
# ------------------------------------------------------------------------------
localhost: export DENO_DIR=.cache/
localhost: cache bundle
	(trap 'kill 0' SIGINT; \
		deno bundle --unstable --watch --config client/tsconfig.json client/bundle.tsx .dist/deno.bundle.js & \
		yarn run webpack --watch --env GRAPHQL_API_ENDPOINT=https://localhost:8443/graphql & \
		deno run --unstable --watch --allow-all server/daemon.tsx --hostname localhost --tls cert/localhost/ \
	)

dev.remote: export DENO_DIR=.cache/
dev.remote: cache bundle
	yarn run webpack --env GRAPHQL_API_ENDPOINT=https://dev.ghostwritten.me/graphql
	deno upgrade --version 1.7.0
	deno --unstable run --allow-all server/daemon.tsx --hostname 0.0.0.0 --domain dev.ghostwritten.me --tls /etc/letsencrypt/live/dev.ghostwritten.me/

remote: export DENO_DIR=.cache/
remote: cache bundle
	yarn run webpack --env GRAPHQL_API_ENDPOINT=https://ghostwritten.me/graphql
	deno upgrade --version 1.7.0
	deno --unstable run --allow-all server/daemon.tsx --hostname 0.0.0.0 --domain ghostwritten.me --tls /etc/letsencrypt/live/ghostwritten.me/

test: export DENO_DIR=.cache/
test: cache
	deno --unstable test --allow-all tests/

# ------------------------------------------------------------------------------
# Docker 
# ------------------------------------------------------------------------------
prune:
	docker container prune --force
	docker image prune --force

dev.docker:
	docker build --tag ghostwritten/server .
	docker run -itd --init -p 443:8443 -p 80:8080 -v "/etc/letsencrypt/:/etc/letsencrypt/" ghostwritten/server:latest make dev.remote

docker:
	docker build --tag ghostwritten/server .
	docker run -itd --init -p 443:8443 -p 80:8080 -v "/etc/letsencrypt/:/etc/letsencrypt/" ghostwritten/server:latest make remote