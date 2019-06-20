package main

import (
	"database/sql"
	"log"
	"net"
	"os"

	"github.com/Buzzvil/stella/booksvc/internal/app/booksrv"
	pb "github.com/Buzzvil/stella/booksvc/pkg/proto"
	_ "github.com/lib/pq"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"
)

func main() {
	listener, err := net.Listen("tcp", ":9000")

	if err != nil {
		grpclog.Fatalf("failed to listen: %v", err)
	}

	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}

	opts := []grpc.ServerOption{}
	grpcServer := grpc.NewServer(opts...)

	pb.RegisterBookServiceServer(grpcServer, booksrv.NewServer(db))

	grpcServer.Serve(listener)
}
