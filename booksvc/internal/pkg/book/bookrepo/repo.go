package bookrepo

import (
	"database/sql"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
	_ "github.com/lib/pq"
)

type repo struct {
	db *sql.DB
}

// New creates postgres repository.
func New(db *sql.DB) book.Repo {
	return &repo{db: db}
}

func (r *repo) GetByID(id int64) (*book.Book, error) {
	rows, err := r.db.Query("SELECT id, name, isbn, publisher, content FROM books WHERE id = $1", id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		b := book.Book{}
		if err := rows.Scan(&b.ID, &b.Name, &b.Isbn, &b.Publisher, &b.Content); err != nil {
			return nil, err
		}
		return &b, nil
	}

	return nil, nil
}

func (r *repo) GetByISBN(isbn string) (*book.Book, error) {
	rows, err := r.db.Query("SELECT id, name, isbn, publisher, content FROM books WHERE isbn = $1", isbn)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		b := book.Book{}
		if err := rows.Scan(&b.ID, &b.Name, &b.Isbn, &b.Publisher, &b.Content); err != nil {
			return nil, err
		}
		return &b, nil
	}

	return nil, nil
}

func (r *repo) GetByFilter(filter string) ([]book.Book, error) {
	return nil, nil
}

func (r *repo) Create(book book.Book) (*book.Book, error) {
	res, err := r.db.Exec("INSERT INTO books (id, isbn, name, publisher, content) VALUES ($1, $2, $3, $4, $5)", book.ID, book.Isbn, book.Name, book.Publisher, book.Content)
	if err != nil {
		return nil, err
	}
	id, _ := res.LastInsertId()
	book.ID = id
	return &book, nil
}
