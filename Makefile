
# ------------------------------------------------------------------------------
# Default
# ------------------------------------------------------------------------------
version:
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
	deno cache --unstable **/*.tsx

bundle: export DENO_DIR=.cache/
bundle: upgrade cache
	mkdir -p .dist/
	yarn install
	deno bundle --config client/tsconfig.json --unstable client/bundle.tsx .dist/deno.bundle.js
	yarn run babel .dist/deno.bundle.js --out-file .dist/babel.bundle.js
	yarn run webpack

# ------------------------------------------------------------------------------
# Run
# ------------------------------------------------------------------------------
debug: export DENO_DIR=.cache/
debug: cache bundle
	(trap 'kill 0' SIGINT; \
		deno bundle --watch --config client/tsconfig.json --unstable client/bundle.tsx .dist/deno.bundle.js & \
		yarn run babel --watch .dist/deno.bundle.js --out-file .dist/babel.bundle.js & \
		yarn run webpack --watch & \
		deno run --watch --allow-all --unstable server/daemon.tsx --hostname localhost --tls cert/localhost/ \
	)

release: export DENO_DIR=.cache/
release: cache bundle
	deno upgrade --version 1.7.0
	deno run --allow-all --unstable server/daemon.tsx --hostname 0.0.0.0 --domain ghostwritten.me --tls /etc/letsencrypt/live/ghostwritten.me/

test: export DENO_DIR=.cache/
test: cache
	deno test --allow-all --unstable tests/

# ------------------------------------------------------------------------------
# Docker 
# ------------------------------------------------------------------------------
prune:
	docker container prune --force
	docker image prune --force

docker: prune
	docker build --tag ghostwritten/server .
	docker run -itd --init -p 443:8443 -p 80:8080 -v "/etc/letsencrypt/:/etc/letsencrypt/" ghostwritten/server:latest