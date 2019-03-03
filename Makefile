.PHONY: proto

SERVICES=booksvc rentalsvc

proto:
	for s in $(SERVICES); do \
		for f in protobuf/$$s/*.proto; do \
			protoc \
				-I./protobuf/$$s \
				--go_out=plugins=grpc:$$s/pkg/proto $$f; \
			protoc \
				-I/usr/local/include -I$$(dirname $$f) \
				-I$(GOPATH)/src/github.com/grpc-ecosystem/grpc-gateway/third_party/googleapis \
				--go_out=plugins=grpc:gatewaysvc/pkg/proto \
				--grpc-gateway_out=logtostderr=true,grpc_api_configuration=gatewaysvc/api_config_http.yaml:gatewaysvc/pkg/proto $$f; \
			echo compiled: $$f; \
		done \
	done
