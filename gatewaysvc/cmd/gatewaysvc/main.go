package main

import (
	"flag"
	"log"
	"net/http"

	gw "github.com/Buzzvil/stella/gatewaysvc/pkg/proto"
	"github.com/grpc-ecosystem/grpc-gateway/runtime"
	"golang.org/x/net/context"
	"google.golang.org/grpc"
)

var (
	booksvcEndpoint   = flag.String("booksvc_endpoint", "localhost:9000", "endpoint of booksvc")
	rentalsvcEndpoint = flag.String("rentalsvc_endpoint", "localhost:9001", "endpoint of rentalsvc")
)

func runServer() error {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := runtime.NewServeMux()
	opts := []grpc.DialOption{grpc.WithInsecure()}
	gw.RegisterBookServiceHandlerFromEndpoint(ctx, mux, *booksvcEndpoint, opts)
	gw.RegisterRentalServiceHandlerFromEndpoint(ctx, mux, *rentalsvcEndpoint, opts)

	return http.ListenAndServe(":8080", mux)
}

func main() {
	flag.Parse()

	if err := runServer(); err != nil {
		log.Fatal(err)
	}
}
