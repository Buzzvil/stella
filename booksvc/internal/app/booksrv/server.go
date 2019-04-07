package booksrv

import (
	"context"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
	pb "github.com/Buzzvil/stella/booksvc/pkg/proto"
)

// Server is interface for grpc server
type server struct {
	u book.Usecase
}

// NewServer initializes server
func NewServer() pb.BookServiceServer {
	u := book.NewUsecase(nil)
	return &server{u: u}
}

func (s *server) ListBooks(c context.Context, r *pb.ListBooksRequest) (*pb.ListBooksResponse, error) {
	books, err := s.u.ListBooks(r.Filter)
	if err != nil {
		return nil, err
	}
	bookList := []*pb.Book{}
	for _, book := range books {
		bookList = append(bookList, &pb.Book{
			Id:        book.ID,
			Name:      book.Name,
			Publisher: book.Publisher,
			Isbn:      book.Isbn,
			Authors:   book.Authors,
		})
	}
	return &pb.ListBooksResponse{Books: bookList}, nil
}

func (s *server) GetBook(c context.Context, r *pb.GetBookRequest) (*pb.Book, error) {
	book, err := s.u.GetBook(r.Id)
	if err != nil {
		return nil, err
	}

	return &pb.Book{
		Name:      book.Name,
		Id:        book.ID,
		Isbn:      book.Isbn,
		Authors:   book.Authors,
		Publisher: book.Publisher,
		Content:   book.Content,
	}, nil
}

func (s *server) CreateBook(c context.Context, r *pb.CreateBookRequest) (*pb.Book, error) {
	b, nil := s.u.CreateBook(r.Name, r.Isbn, r.Authors, r.Publisher, r.Content)
	return &pb.Book{
		Name:      b.Name,
		Id:        b.ID,
		Isbn:      b.Isbn,
		Authors:   b.Authors,
		Publisher: b.Publisher,
		Content:   b.Content,
	}, nil
}
