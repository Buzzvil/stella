package crawler

type Usecase interface {
	Search(query string) (*Book, error)
}

type usecase struct {
	repo Repo
}

func NewUsecase(repo Repo) Usecase {
	return &usecase{
		repo: repo,
	}
}

func (u *usecase) Search(query string) (*Book, error) {
	return u.repo.Search(query)
}
