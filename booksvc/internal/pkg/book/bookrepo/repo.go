package bookrepo

import (
	"database/sql"
	"errors"
	"strings"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
)

type repo struct {
	db *sql.DB
}

// New creates postgres repository.
func New(db *sql.DB) book.Repo {
	return &repo{db: db}
}

func (r *repo) GetByID(id int64) (*book.Book, error) {
	rows, err := r.db.Query("SELECT id, name, isbn, authors, publisher, content FROM books WHERE id = $1", id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		b := book.Book{}
		var authorStr sql.NullString
		if err := rows.Scan(&b.ID, &b.Name, &b.Isbn, &authorStr, &b.Publisher, &b.Content); err != nil {
			return nil, err
		}
		if authorStr.Valid {
			b.Authors = strings.Split(authorStr.String, ",")
		}
		return &b, nil
	}

	return nil, errors.New("Not found")
}

func (r *repo) GetByISBN(isbn string) (*book.Book, error) {
	rows, err := r.db.Query("SELECT id, name, isbn, authors, publisher, content FROM books WHERE isbn = $1", isbn)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		b := book.Book{}
		var authorStr sql.NullString
		if err := rows.Scan(&b.ID, &b.Name, &b.Isbn, &authorStr, &b.Publisher, &b.Content); err != nil {
			return nil, err
		}
		if authorStr.Valid {
			b.Authors = strings.Split(authorStr.String, ",")
		}
		return &b, nil
	}

	return nil, nil
}

func (r *repo) GetByFilter(filter string) ([]book.Book, error) {
	books := []book.Book{}
	rows, err := r.db.Query("SELECT id, name, isbn, authors, publisher, content FROM books WHERE name ILIKE '%' || $1 || '%'", filter)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		b := book.Book{}
		var authorStr sql.NullString
		if err := rows.Scan(&b.ID, &b.Name, &b.Isbn, &authorStr, &b.Publisher, &b.Content); err != nil {
			return nil, err
		}
		if authorStr.Valid {
			b.Authors = strings.Split(authorStr.String, ",")
		}
		books = append(books, b)
	}

	return books, nil
}

func (r *repo) Create(book book.Book) (*book.Book, error) {
	res, err := r.db.Exec("INSERT INTO books (isbn, name, authors, publisher, content) VALUES ($1, $2, $3, $4, $5)", book.Isbn, book.Name, strings.Join(book.Authors, ","), book.Publisher, book.Content)
	if err != nil {
		return nil, err
	}
	id, _ := res.LastInsertId()
	book.ID = id
	return &book, nil
}
