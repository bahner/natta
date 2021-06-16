#!/usr/bin/env make -ef

all: clean build

clean:
	rm -rf build node_modules
	make -C api clean

node_modules:
	yarn
	make -C api node_modules

build: node_modules
	yarn build

dev:  node_modules
	yarn start
	make -C api dev
