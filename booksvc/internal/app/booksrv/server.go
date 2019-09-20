package booksrv

import (
	"context"
	"database/sql"
	"log"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
	"github.com/Buzzvil/stella/booksvc/internal/pkg/book/repo"
	pb "github.com/Buzzvil/stella/booksvc/pkg/proto"
	"google.golang.org/grpc/metadata"
)

// Server is interface for grpc server
type server struct {
	u book.Usecase
}

// NewServer initializes server
func NewServer(db *sql.DB) pb.BookServiceServer {
	repo := repo.New(db)
	u := book.NewUsecase(repo)
	return &server{u: u}
}

func (s *server) ListBooks(c context.Context, r *pb.ListBooksRequest) (*pb.ListBooksResponse, error) {
	md, _ := metadata.FromIncomingContext(c)
	log.Printf("gRPC Metadata: +%v\n", md)

	if len(r.Ids) > 0 {
		books, err := s.u.ListBooks(r.Ids)
		if err != nil {
			return nil, err
		}
		return &pb.ListBooksResponse{Books: s.booksToPBBooks(books)}, nil
	}

	books, err := s.u.SearchBooks(r.Filter)
	if err != nil {
		return nil, err
	}
	return &pb.ListBooksResponse{Books: s.booksToPBBooks(books)}, nil
}

func (s *server) booksToPBBooks(books []*book.Book) []*pb.Book {
	bookList := make([]*pb.Book, 0)
	for _, book := range books {
		bookList = append(bookList, &pb.Book{
			Id:         book.ID,
			Name:       book.Name,
			Publisher:  book.Publisher,
			Isbn:       book.Isbn,
			Authors:    book.Authors,
			Content:    book.Content,
			CoverImage: book.CoverImage,
		})
	}
	return bookList
}

func (s *server) GetBook(c context.Context, r *pb.GetBookRequest) (*pb.Book, error) {
	var book *book.Book
	var err error
	if len(r.GetIsbn()) > 0 {
		book, err = s.u.GetBookByISBN(r.Isbn)
	} else {
		book, err = s.u.GetBook(r.Id)
	}

func (s *server) SearchBookInfo(c context.Context, r *pb.SearchBookRequest) (*pb.SearchBookResponse, error) {
	bs, err := s.cu.SearchByISBN(r.GetIsbn())
	if err != nil {
		return nil, err
	}

	books := []*pb.Book{}
	for _, book := range bs {
		books = append(books, &pb.Book{
			Name:       book.Name,
			Isbn:       book.Isbn,
			Authors:    book.Authors,
			Publisher:  book.Publisher,
			Content:    book.Content,
			CoverImage: book.CoverImage,
		})
	}
	return &pb.SearchBookResponse{Books: books}, nil
}

func (s *server) CreateBook(c context.Context, r *pb.CreateBookRequest) (*pb.Book, error) {
	book := book.Book{
		Name:       r.Name,
		Isbn:       r.Isbn,
		Authors:    r.Authors,
		Publisher:  r.Publisher,
		Content:    r.Content,
		CoverImage: r.CoverImage,
	}
	b, err := s.u.CreateBook(book)
	if err != nil {
		return nil, err
	}
	return &pb.Book{
		Name:       b.Name,
		Id:         b.ID,
		Isbn:       b.Isbn,
		Authors:    b.Authors,
		Publisher:  b.Publisher,
		Content:    b.Content,
		CoverImage: b.CoverImage,
	}, nil
}
