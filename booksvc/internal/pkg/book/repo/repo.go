package repo

import (
	"database/sql"
	"errors"
	"strings"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
)

type repo struct {
	db *sql.DB
}

type dbBook struct {
	id            int64
	name          string
	isbn          sql.NullString
	authors       sql.NullString
	publisher     sql.NullString
	content       sql.NullString
	coverImageURL sql.NullString
}

func dbBookToBook(d *dbBook) (b *book.Book) {
	b = &book.Book{
		ID:         d.id,
		Name:       d.name,
		Isbn:       d.isbn.String,
		Publisher:  d.publisher.String,
		Content:    d.content.String,
		CoverImage: d.coverImageURL.String,
	}
	if d.authors.Valid {
		b.Authors = strings.Split(d.authors.String, ",")
	}
	return
}

// New creates postgres repository.
func New(db *sql.DB) book.Repo {
	return &repo{db: db}
}

func (r *repo) GetByID(id int64) (*book.Book, error) {
	rows, err := r.db.Query("SELECT id, name, isbn, authors, publisher, content, cover_image_url FROM books WHERE id = $1", id)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		d := dbBook{}
		if err := rows.Scan(&d.id, &d.name, &d.isbn, &d.authors, &d.publisher, &d.content, &d.coverImageURL); err != nil {
			return nil, err
		}
		return dbBookToBook(&d), nil
	}

	return nil, errors.New("Not found")
}

func (r *repo) GetByISBN(isbn string) (*book.Book, error) {
	rows, err := r.db.Query("SELECT id, name, isbn, authors, publisher, content, cover_image_url FROM books WHERE isbn = $1", isbn)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		d := dbBook{}
		if err := rows.Scan(&d.id, &d.name, &d.isbn, &d.authors, &d.publisher, &d.content, &d.coverImageURL); err != nil {
			return nil, err
		}
		return dbBookToBook(&d), nil
	}

	return nil, nil
}

func (r *repo) GetByFilter(filter string) ([]*book.Book, error) {
	books := []*book.Book{}
	rows, err := r.db.Query("SELECT id, name, isbn, authors, publisher, content, cover_image_url FROM books WHERE (name) ILIKE '%' || $1 || '%' or (authors) ILIKE '%' || $1 || '%'", filter)
	if err != nil {
		return nil, err
	}
	defer rows.Close()
	for rows.Next() {
		d := dbBook{}
		if err := rows.Scan(&d.id, &d.name, &d.isbn, &d.authors, &d.publisher, &d.content, &d.coverImageURL); err != nil {
			return nil, err
		}
		books = append(books, dbBookToBook(&d))
	}

	return books, nil
}

func (r *repo) Create(book book.Book) (*book.Book, error) {
	res, err := r.db.Exec("INSERT INTO books (isbn, name, authors, publisher, content, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6)", book.Isbn, book.Name, strings.Join(book.Authors, ","), book.Publisher, book.Content, book.CoverImage)
	if err != nil {
		return nil, err
	}
	id, _ := res.LastInsertId()
	book.ID = id
	return &book, nil
}
