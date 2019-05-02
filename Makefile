.PHONY: proto

SERVICES=booksvc rentalsvc ratingsvc
CLIENT_OUTPUT_DIR=frontend/proto

proto:
	for s in $(SERVICES); do \
		for f in protobuf/$$s/*.proto; do \
			protoc \
				-I./protobuf/$$s \
				--go_out=plugins=grpc:$$s/pkg/proto \
				--js_out=import_style=commonjs:$(CLIENT_OUTPUT_DIR) \
				--grpc-web_out=import_style=commonjs+dts,mode=grpcwebtext:$(CLIENT_OUTPUT_DIR) $$f; \
			echo compiled: $$f; \
		done \
	done;
