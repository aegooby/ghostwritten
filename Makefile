
clean:
	rm -rf .deno

install:
	curl -fsSL https://deno.land/x/install/install.sh | sh

image:
	docker build --tag ghostwritten/gw-server .

container:
	docker run -it --init -p 443:443 ghostwritten/gw-server:latest

https:
	[ -d .https ] || mkdir -p .https
	cd .https && minica --domains localhost

cache: export DENO_DIR=.deno/cache
cache:
	[ -d .deno/cache ] || mkdir -p .deno/cache
	deno cache --import-map import-map.json --unstable server/server.tsx client/client.tsx

bundle: export DENO_DIR=.deno/cache
bundle:
	[ -d .deno ] || make cache
	deno bundle client/client.tsx --import-map import-map.json --config client/tsconfig.json --unstable .deno/client.js

start: export DENO_DIR=.deno/cache
start:
	[ -d .deno/cache ] || make cache
	[ -d .https ] || make https
	make bundle
	deno run --allow-all --import-map import-map.json --unstable main.ts
