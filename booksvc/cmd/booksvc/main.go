package main

import (
	"net"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/booksrv"
	pb "github.com/Buzzvil/stella/booksvc/pkg/proto"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
)

func main() {
	listener, err := net.Listen("tcp", ":9000")

	if err != nil {
		grpclog.Fatalf("failed to listen: %v", err)
	}

	opts := []grpc.ServerOption{}
	grpcServer := grpc.NewServer(opts...)

	pb.RegisterBookServiceServer(grpcServer, booksrv.NewServer())

	grpcServer.Serve(listener)
}
