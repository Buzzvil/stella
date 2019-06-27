.PHONY: dependency unit-test

dependency:
	@go get -v ./...

unit-test: dependency
	@go test -v -short ./...
