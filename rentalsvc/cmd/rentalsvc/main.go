package main

import (
	"net"
	"os"

	"github.com/Buzzvil/stella/rentalsvc/internal/app/rentalsrv"
	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental/repo"
	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres" // Mysql 사용할 경우 _ "github.com/jinzhu/gorm/dialects/mysql"

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

	db := getDB()
	defer db.Close()
	rentalUsecase := rental.NewUsecase(repo.New(db))
	pb.RegisterRentalServiceServer(grpcServer, rentalsrv.New(rentalUsecase))

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
