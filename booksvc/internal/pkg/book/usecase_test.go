package book

import (
	"testing"

	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"

	"github.com/stretchr/testify/assert"
)

func TestGetBook(t *testing.T) {
	id := int64(100)
	isbn := "0011"
	book := Book{Name: "book", ID: id, Isbn: isbn}

	mockRepo := new(mockRepo)
	mockRepo.On("GetByID", id).Return(&book, nil).Once()

	u := NewUsecase(mockRepo)
	b, err := u.GetBook(id)

	mockRepo.AssertExpectations(t)
	assert.Nil(t, err)
	assert.Equal(t, isbn, b.Isbn)
}

func TestCreateBook(t *testing.T) {
	id := int64(100)
	isbn := "0011"
	name := "book name"
	bookEntity := Book{Name: name, Isbn: isbn}
	book := Book{Name: name, ID: id, Isbn: isbn}

	mockRepo := new(mockRepo)
	mockRepo.On("Create", mock.Anything).Return(&book, nil).Once()

	u := NewUsecase(mockRepo)
	b, err := u.CreateBook(bookEntity)

	mockRepo.AssertExpectations(t)
	require.Nil(t, err)
	assert.Equal(t, id, b.ID)
	assert.Equal(t, isbn, b.Isbn)
}

type mockRepo struct {
	mock.Mock
}

func (r *mockRepo) GetByID(id int64) (*Book, error) {
	args := r.Called(id)
	return args.Get(0).(*Book), nil
}

func (r *mockRepo) GetByISBN(isbn string) (*Book, error) {
	args := r.Called(isbn)
	return args.Get(0).(*Book), nil
}

func (r *mockRepo) GetByFilter(filter string) ([]*Book, error) {
	args := r.Called(filter)
	return args.Get(0).([]*Book), nil
}

func (r *mockRepo) Create(book Book) (*Book, error) {
	args := r.Called(book)
	return args.Get(0).(*Book), nil
}
