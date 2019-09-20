package crawlersrv

import (
	"database/sql"
	"errors"
	"fmt"
	"strconv"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
	"github.com/Buzzvil/stella/booksvc/internal/pkg/book/repo"
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
	br := repo.New(db, key)
	bu := book.NewUsecase(br)
	return Runner{u: u, bu: bu}
}

// Start search book with query
func (r *Runner) Start(query string, id string) error {
	b, err := r.u.Find(query)
	if err != nil {
		fmt.Println(err)
		return err
	}
	if b == nil {
		return errors.New("Not found")
	}

	i, _ := strconv.ParseInt(id, 10, 64)
	book := book.Book{
		ID: i,
		BookInfo: book.BookInfo{
			Name:       b.Name,
			Isbn:       b.Isbn,
			Authors:    b.Authors,
			Publisher:  b.Publisher,
			Content:    b.Content,
			CoverImage: b.CoverImage,
		},
	}

	_, e := r.bu.CreateBook(book)
	if e != nil {
		return e
	}
	return nil
}
