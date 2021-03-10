
clean:
	rm -rf .httpsaurus

install-deno:
	curl -fsSL https://deno.land/x/install/install.sh | sh

image:
	docker build --tag ghostwritten/server .

container:
	docker run -it --init -p 80:8443 ghostwritten/server:latest

https:
	[ -d .https ] || mkdir -p .https
	cd .https && minica --domains localhost --ip-addresses 0.0.0.0

cache: export DENO_DIR=.httpsaurus/cache
cache:
	[ -d .httpsaurus/cache ] || mkdir -p .httpsaurus/cache
	deno cache --unstable **/*.tsx

start-dev: export DENO_DIR=.httpsaurus/cache
start-dev:
	[ -d .httpsaurus/cache ] || make cache
	[ -d .https ] || make https
	deno run --allow-all --unstable server/daemon.tsx --protocol https --hostname localhost --port 8443

start-docker: export DENO_DIR=.httpsaurus/cache
start-docker:
	[ -d .httpsaurus/cache ] || make cache
	[ -d .https ] || make https
	deno run --allow-all --unstable server/daemon.tsx --protocol http --hostname 0.0.0.0 --port 8443

test: export DENO_DIR=.httpsaurus/cache
test:
	[ -d .httpsaurus/cache ] || make cache
	[ -d .https ] || make https
	deno test --allow-all --unstable tests/
