package booksrv

import (
	"context"

	pb "github.com/Buzzvil/stella/booksvc/pkg/proto"
)

// Server is interface for grpc server
type server struct {
}

// NewServer initializes server
func NewServer() pb.BookServiceServer {
	return &server{}
}

func (s *server) SearchBooks(c context.Context, request *pb.BooksQueryRequest) (*pb.BooksResponse, error) {
	return &pb.BooksResponse{
		Books: []*pb.Book{
			&pb.Book{
				Name: "Harry Potter",
				Id:   1,
			},
		},
	}, nil
}
