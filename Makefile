.PHONY: proto

SERVICES=booksvc rentalsvc ratingsvc usersvc
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

tunnel:
	export AWS_PROFILE=eks-buzzvil && unset AWS_ACCESS_KEY_ID && unset AWS_SECRET_ACCESS_KEY && \
	kubectl config use-context eks-buzzscreen && \
	kubectl port-forward --namespace stella svc/stella-db-postgresql 5432:5432