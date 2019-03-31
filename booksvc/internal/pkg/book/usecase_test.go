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
	book := Book{Name: "book", ID: id, Isbn: isbn}

	mockRepo := new(mockRepo)
	mockRepo.On("Create", mock.Anything).Return(&book, nil).Once()

	u := NewUsecase(mockRepo)
	b, err := u.CreateBook("name", "isbn", []string{"authors"}, "publisher", "content")

	mockRepo.AssertExpectations(t)
	require.Nil(t, err)
	assert.NotEqual(t, 0, b.ID)
	assert.Equal(t, isbn, b.Isbn)
}
