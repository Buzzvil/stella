package crawlersrv

import (
	"database/sql"
	"errors"
	"fmt"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
	"github.com/Buzzvil/stella/booksvc/internal/pkg/book/bookrepo"
	"github.com/Buzzvil/stella/booksvc/internal/pkg/crawler"
	"github.com/Buzzvil/stella/booksvc/internal/pkg/crawler/crawlerrepo"
)

// Runner is interface for crawler
type Runner struct {
	u  crawler.Usecase
	bu book.Usecase
}

// NewRunner initializes runner
func NewRunner(key string, db *sql.DB) Runner {
	r := crawlerrepo.New(key)
	u := crawler.NewUsecase(r)
	br := bookrepo.New(db)
	bu := book.NewUsecase(br)
	return Runner{u: u, bu: bu}
}

// Start search book with query
func (r *Runner) Start(query string) error {
	b, err := r.u.Search(query)
	if err != nil {
		fmt.Println(err)
		return err
	}
	if b == nil {
		return errors.New("Not found")
	}

	book := book.Book{
		Name:      b.Name,
		Isbn:      b.Isbn,
		Authors:   b.Authors,
		Publisher: b.Publisher,
		Content:   b.Content,
	}

	_, e := r.bu.CreateBook(book)
	if e != nil {
		return e
	}
	return nil
}
