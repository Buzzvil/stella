package book

import (
	"errors"
)

type Usecase interface {
	GetBook(id int64) (Book, error)
	CreateBook(name string, isbn string, authors []string, publisher string, content string) error
	ListBooks(filter string) ([]Book, error)
}

type usecase struct {
	repo Repo
}

// NewUsecase creates new installed app service.
func NewUsecase(repo Repo) Usecase {
	return &usecase{
		repo: repo,
	}
}

// GetBook returns book with book id.
func (u *usecase) GetBook(id int64) (Book, error) {
	return u.repo.GetByID(id)
}

// CreateBook creates book into repository.
func (u *usecase) CreateBook(name string, isbn string, authorNames []string, publisher string, content string) error {
	if _, err := u.repo.GetByISBN(isbn); err == nil {
		return errors.New("This book is already registered")
	}

	b := Book{
		Name:      name,
		Isbn:      isbn,
		Authors:   authorNames,
		Publisher: publisher,
		Content:   content,
	}

	if err := u.repo.Create(b); err != nil {
		return err
	}
	return nil
}

func (u *usecase) ListBooks(filter string) ([]Book, error) {
	books, err := u.repo.GetByFilter(filter)
	if err == nil {
		return books, nil
	}
	return nil, err
}
