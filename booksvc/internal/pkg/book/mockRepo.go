package book

import (
	"github.com/stretchr/testify/mock"
)

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
