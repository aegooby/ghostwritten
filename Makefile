
clean:
	rm -rf .httpsaurus

install-deno:
	curl -fsSL https://deno.land/x/install/install.sh | sh

image:
	docker build --tag ghostwritten/server .

container:
	docker run --interactive --tty --init --publish 80:8443 --detach ghostwritten/server:latest

cache: export DENO_DIR=.httpsaurus/cache
cache:
	[ -d .httpsaurus/cache ] || mkdir -p .httpsaurus/cache
	deno cache --unstable **/*.tsx

start-dev: export DENO_DIR=.httpsaurus/cache
start-dev:
	[ -d .httpsaurus/cache ] || make cache
	deno run --allow-all --unstable server/daemon.tsx --protocol https --hostname localhost --port 8443 --cert cert/localhost

start-docker: export DENO_DIR=.httpsaurus/cache
start-docker:
	[ -d .httpsaurus/cache ] || make cache
	deno run --allow-all --unstable server/daemon.tsx --protocol http --hostname 0.0.0.0 --port 8443

test: export DENO_DIR=.httpsaurus/cache
test:
	[ -d .httpsaurus/cache ] || make cache
	deno test --allow-all --unstable tests/
