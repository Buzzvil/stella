package repo

import (
	"database/sql"
	"encoding/json"
	"errors"
	"net/http"
	"net/url"
	"strconv"
	"strings"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
)

type repo struct {
	db  *sql.DB
	key string
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

type kakaoResp struct {
	Documents []kakaoBook
}

type kakaoBook struct {
	Contents  string
	Isbn      string
	Publisher string
	Thumbnail string
	Title     string
	Authors   []string
}

func dbBookToBook(d *dbBook) (b *book.Book) {
	b = &book.Book{
		ID: d.id,
		BookInfo: book.BookInfo{
			Name:       d.name,
			Isbn:       d.isbn.String,
			Publisher:  d.publisher.String,
			Content:    d.content.String,
			CoverImage: d.coverImageURL.String,
		},
	}
	if d.authors.Valid {
		b.Authors = strings.Split(d.authors.String, ",")
	}
	return
}

// New creates postgres repository.
func New(db *sql.DB, key string) book.Repo {
	return &repo{db: db, key: key}
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

func (r *repo) GetByIDs(ids []int64) ([]*book.Book, error) {
	books := []*book.Book{}
	idStr := ""
	for _, id := range ids {
		idStr = idStr + strconv.FormatInt(id, 10) + ","
	}
	idStr = idStr[:len(idStr)-1]
	rows, err := r.db.Query("SELECT id, name, isbn, authors, publisher, content, cover_image_url FROM books WHERE id = ANY(ARRAY[" + idStr + "])")
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

func (r *repo) SearchByISBN(isbn string) ([]*book.BookInfo, error) {
	client := &http.Client{}
	api := "https://dapi.kakao.com/v3/search/book?target=isbn"
	req, err := http.NewRequest("GET", api+"&query="+url.QueryEscape(isbn), nil)
	req.Header.Add("Authorization", "KakaoAK "+r.key)
	resp, err := client.Do(req)
	if err != nil {
		return nil, err
	}

	defer resp.Body.Close()

	target := &kakaoResp{}
	e := json.NewDecoder(resp.Body).Decode(target)
	books := []*book.BookInfo{}
	for _, d := range target.Documents {
		books = append(books, &book.BookInfo{
			Authors:    d.Authors,
			Content:    d.Contents,
			Isbn:       d.Isbn,
			Publisher:  d.Publisher,
			Name:       d.Title,
			CoverImage: d.Thumbnail,
		})
	}

	return books, e
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
