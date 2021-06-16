#!/usr/bin/env make -ef

default: docker

clean:
	rm -rf node_modules

node_modules:
	yarn install --force

docker:
	docker-compose build --no-cache api

dev: node_modules
	docker-compose -f docker-compose.dev.yaml build
	docker-compose -f docker-compose.dev.yaml up

.PHONY: all clean docker dev
