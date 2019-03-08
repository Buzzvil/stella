.PHONY: proto

SERVICES=booksvc rentalsvc

proto:
	for s in $(SERVICES); do \
		for f in protobuf/$$s/*.proto; do \
			protoc \
				-I./protobuf/$$s \
				--go_out=plugins=grpc:$$s/pkg/proto $$f; \
			echo compiled: $$f; \
		done \
	done
