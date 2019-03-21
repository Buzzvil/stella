package book

// Repo declares book repository interface.
type Repo interface {
	GetByID(id int64) (Book, error)
	GetByISBN(isbn string) ([]Book, error)
	GetByFilter(filter string) ([]Book, error)
	Create(book Book) error
}
