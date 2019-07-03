package main

import (
	"net"
	"os"

	"github.com/Buzzvil/stella/ratingsvc/internal/app/ratingsrv"
	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating"
	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating/repo"
	"github.com/jinzhu/gorm"
	_ "github.com/lib/pq"

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

	db := getDB()
	defer db.Close()
	ratingUsecase := rating.NewUsecase(repo.New(db))

	pb.RegisterRatingServiceServer(grpcServer, ratingsrv.New(ratingUsecase))

	_ = grpcServer.Serve(listener)
}

func getDB() *gorm.DB {
	url := os.Getenv("DATABASE_URL")
	db, err := gorm.Open("postgres", url)
	if err != nil {
		panic(err)
	}
	db.LogMode(true)

	return db
}
