package booksrv

import (
	"context"
	"testing"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
	pb "github.com/Buzzvil/stella/booksvc/pkg/proto"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
)

type mockUsecase struct {
	mock.Mock
}

func (s *mockUsecase) GetBook(id int64) (*book.Book, error) {
	args := s.Called(id)
	return args.Get(0).(*book.Book), nil
}

func (s *mockUsecase) CreateBook(b book.Book) (*book.Book, error) {
	args := s.Called(b)
	return args.Get(0).(*book.Book), nil
}

func (s *mockUsecase) SearchBooks(filter string) ([]*book.Book, error) {
	args := s.Called(filter)
	return args.Get(0).([]*book.Book), nil
}

func (s *mockUsecase) ListBooks(ids []int64) ([]*book.Book, error) {
	args := s.Called(ids)
	return args.Get(0).([]*book.Book), nil
}

func TestGetBook(t *testing.T) {
	u := new(mockUsecase)
	s := server{u: u}
	id := int64(100)
	book := book.Book{ID: id}
	in := pb.GetBookRequest{Id: id}

	u.On("GetBook", id).Return(&book).Once()

	res, err := s.GetBook(context.Background(), &in)
	require.Nil(t, err)
	assert.Equal(t, id, res.Id)
}

func TestCreateBook(t *testing.T) {
	u := new(mockUsecase)
	s := server{u: u}
	isbn := "isbn_0001"
	id := int64(100)
	book := book.Book{ID: id, Isbn: isbn}
	in := pb.CreateBookRequest{Isbn: isbn}

	u.On("CreateBook", mock.Anything, mock.Anything, mock.Anything, mock.Anything, mock.Anything).Return(&book).Once()

	res, err := s.CreateBook(context.Background(), &in)
	require.Nil(t, err)
	assert.Equal(t, isbn, res.Isbn)
	assert.Equal(t, id, res.Id)
}

func TestListBooks(t *testing.T) {
	u := new(mockUsecase)
	s := server{u: u}
	isbn := "isbn_0001"
	id := int64(100)
	books := []*book.Book{&book.Book{ID: id, Isbn: isbn}}
	filter := ""
	in := pb.ListBooksRequest{Filter: filter}

	u.On("SearchBooks", mock.Anything).Return(books).Once()

	res, err := s.ListBooks(context.Background(), &in)
	require.Nil(t, err)
	assert.Equal(t, 1, len(res.Books))
	assert.Equal(t, id, res.Books[0].Id)
}
