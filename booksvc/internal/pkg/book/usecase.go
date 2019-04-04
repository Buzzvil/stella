package book

type Usecase interface {
	GetBook(id int64) (*Book, error)
	CreateBook(book Book) (*Book, error)
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
func (u *usecase) GetBook(id int64) (*Book, error) {
	return u.repo.GetByID(id)
}

// CreateBook creates book into repository.
func (u *usecase) CreateBook(book Book) (*Book, error) {
	b, err := u.repo.Create(book)
	if err != nil {
		return nil, err
	}
	return b, nil
}

// TODO: define what is filter
func (u *usecase) ListBooks(filter string) ([]Book, error) {
	books, err := u.repo.GetByFilter(filter)
	if err == nil {
		return books, nil
	}
	return nil, err
}
