#image namespace
IMG_NS?=MUST_SPECIFIED

IMG_TAG?=latest

SERVICE=entp-policy-web

image="docker.sugonup.com/$(IMG_NS)/$(SERVICE):$(IMG_TAG)"
base="docker.sugonup.com/$(IMG_NS)/$(SERVICE):node-$(IMG_TAG)"

all: build push

env: build-env push-env

build-env:
	@echo building $(base) ...
	@docker build -t $(base) -f env.Dockerfile .

push-env:
	@echo pushing $(base) ...
	@docker push $(base)

build:
	@echo building $(image) ...
	@docker build -t $(image) --build-arg BASE=$(base) .

push:
	@echo pushing $(image) ...
	@docker push $(image)
