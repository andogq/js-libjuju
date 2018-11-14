DEVENV = devenv
NODE_MODULES = node_modules
SCHEMA = schemas/schema.json
SYSDEPS = build-essential jq python3-virtualenv tox


.PHONY: all
all: help

$(DEVENV):
	tox -e $(DEVENV)

$(NODE_MODULES):
	npm install

dev: $(DEVENV)

dev-js: $(NODE_MODULES)

.PHONY: dist
dist: clean dev check
	$(DEVENV)/bin/python setup.py sdist bdist_wheel

.PHONY: check
check: check-js
	tox

.PHONY: check-js
check-js: lint-js test-js

.PHONY: clean
clean:
	rm -rf $(DEVENV) .tox dist *.egg-info
	rm -rf $(NODE_MODULES)/ package-lock.json
	# go modules creates a read-ony cache.
	chmod -R u+w schemas/build 2> /dev/null || true
	rm -rf schemas/build

.PHONY: generate
generate: dev dev-js
	rm -f api/doc/*.md api/facades/*.js
	devenv/bin/generate $(SCHEMA)

.PHONY: help
help:
	@echo -e "$(PROJECT) - list of make targets:\n"
	@echo "make sysdeps - install system dependencies (debian packages)"
	@echo "make dev - create the development environment"
	@echo "make generate - generate API in api/facades and docs from schema"
	@echo "make update-schema - update schema with current juju develop"
	@echo "make test - run unit tests"
	@echo "make lint - run lint"
	@echo "make check - run lint and tests on the resulting packages"
	@echo "make clean - clean up the development environment"
	@echo "make tag - tag a new release"
	@echo "make release - create a new py release and upload it to PyPI"
	@echo "make release-js - create a new js release and upload it to npm"

.PHONY: lint
lint: dev
	$(DEVENV)/bin/flake8 . --exclude .tox,devenv,schemas

.PHONY: lint-js
lint-js: dev-js
	npm run lint

.PHONY: release
release: dist
	$(DEVENV)/bin/pip install twine
	$(DEVENV)/bin/twine upload dist/*

.PHONY: release-js
release-js: clean check
	npm publish

.PHONY: sysdeps
sysdeps:
	sudo apt install -y $(SYSDEPS)

.PHONY: tag
tag: dev
	git tag v`$(DEVENV)/bin/python setup.py --version`
	git push --tags origin master

.PHONY: test
test: dev
	$(DEVENV)/bin/python -m unittest discover . -v

.PHONY: test-js
test-js: dev-js
	npm t

.PHONY: update-schema
update-schema:
	schemas/create.sh $(SCHEMA)
