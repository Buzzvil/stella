.PHONY: proto

SERVICES=booksvc rentalsvc ratingsvc

proto:
	for s in $(SERVICES); do \
		for f in protobuf/$$s/*.proto; do \
			protoc \
				-I./protobuf/$$s \
				--go_out=plugins=grpc:$$s/pkg/proto $$f; \
			protoc \
				-I./protobuf/$$s \
				--js_out=import_style=commonjs:frontend/src/proto \
				--grpc-web_out=import_style=typescript,mode=grpcweb:frontend/src/proto $$f; \
			echo compiled: $$f; \
		done \
	done; \
	for f in frontend/src/proto/*.js; do \
		sed -i.old '1s;^;/* eslint-disable */;' $$f; \
	done
