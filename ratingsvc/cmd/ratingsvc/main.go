package main

import (
	"net"

	"github.com/Buzzvil/stella/ratingsvc/internal/app/ratingsrv"

	pb "github.com/Buzzvil/stella/ratingsvc/pkg/proto"
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

	pb.RegisterRatingServiceServer(grpcServer, ratingsrv.New())

	_ = grpcServer.Serve(listener)
}
