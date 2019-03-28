package main

import (
	"github.com/Buzzvil/stella/rentalsvc/internal/app/rentalsrv"
	"net"

	pb "github.com/Buzzvil/stella/rentalsvc/pkg/proto"
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

	pb.RegisterRentalServiceServer(grpcServer, rentalsrv.New())

	_ = grpcServer.Serve(listener)
}
