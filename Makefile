.PHONY: proto

proto:
	for f in **/**/proto/*.proto; do \
		protoc --go_out=plugins=grpc:. $$f; \
		echo compiled: $$f; \
	done
