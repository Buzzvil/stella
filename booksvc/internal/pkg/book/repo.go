package book

// Repo declares book repository interface.
type Repo interface {
	GetByID(id int64) (*Book, error)
	GetByISBN(isbn string) (*Book, error)
	GetByIDs(ids []int64) ([]*Book, error)
	GetByFilter(filter string) ([]*Book, error)
	SearchByISBN(isbn string) ([]*BookInfo, error)
	Create(book Book) (*Book, error)
}
