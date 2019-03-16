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

func (s *server) ListBooks(c context.Context, r *pb.ListBooksRequest) (*pb.ListBooksResponse, error) {
	return &pb.ListBooksResponse{
		Books: []*pb.Book{
			&pb.Book{
				Name: "Harry Potter",
				Id:   1,
			},
		},
	}, nil
}

func (s *server) GetBook(c context.Context, r *pb.GetBookRequest) (*pb.Book, error) {
	return &pb.Book{
		Name: "Harry Potter",
		Id:   1,
	}, nil
}

func (s *server) CreateBook(c context.Context, r *pb.CreateBookRequest) (*pb.Book, error) {
	return &pb.Book{
		Name: "Harry Potter",
		Id:   1,
	}, nil
}
