package crawler

type Usecase interface {
	Find(query string) (*Book, error)
	SearchByISBN(isbn string) ([]Book, error)
}

type usecase struct {
	repo Repo
}

func NewUsecase(repo Repo) Usecase {
	return &usecase{
		repo: repo,
	}
}

func (u *usecase) Find(query string) (*Book, error) {
	return u.repo.Find(query)
}

func (u *usecase) SearchByISBN(isbn string) ([]Book, error) {
	return u.repo.SearchByISBN(isbn)
}
