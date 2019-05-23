package crawlersrv

import (
	"errors"
	"fmt"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/crawler"
	"github.com/Buzzvil/stella/booksvc/internal/pkg/crawler/crawlerrepo"
)

type Runner struct {
	u crawler.Usecase
}

func NewRunner(key string) Runner {
	r := crawlerrepo.New(key)
	u := crawler.NewUsecase(r)
	return Runner{u: u}
}

func (r *Runner) Start(query string) error {
	book, err := r.u.Search(query)
	if err != nil {
		fmt.Println(err)
		return err
	}
	if book == nil {
		return errors.New("Not found")
	}
	fmt.Println("Book Found: " + book.Name)
	return nil
}
