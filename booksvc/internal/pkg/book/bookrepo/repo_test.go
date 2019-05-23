package bookrepo

import (
	"database/sql"
	"testing"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
	_ "github.com/lib/pq"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

type repoTestSuite struct {
	suite.Suite
	db *sql.DB
}

func TestRepoTestSuite(t *testing.T) {
	suite.Run(t, new(repoTestSuite))
}

func (s *repoTestSuite) SetupSuite() {
	db, err := sql.Open("postgres", "postgres://postgres@localhost:30432/stella?sslmode=disable")
	require.Nil(s.T(), err)
	s.db = db
}

func (s *repoTestSuite) SetupTest() {
	_, err := s.db.Exec("DELETE FROM books")
	require.Nil(s.T(), err)
}

func (s *repoTestSuite) TearDownSuite() {
	s.db.Close()
}

func (s *repoTestSuite) TestGetByID() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	id := int64(10001)
	isbn := "isbn 10001"
	name := "book name"
	publisher := "pub"
	content := "book description"

	_, err := s.db.Exec("INSERT INTO books (id, isbn, name, publisher, content) VALUES ($1, $2, $3, $4, $5)", id, isbn, name, publisher, content)
	require.Nil(err)

	r := New(s.db)
	book, err := r.GetByID(id)
	require.Nil(err)
	require.NotNil(book)
	assert.Equal(name, book.Name)
	assert.Equal(isbn, book.Isbn)
	assert.Equal(publisher, book.Publisher)
	assert.Equal(content, book.Content)
}

func (s *repoTestSuite) TestGetByISBN() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	id := int64(10001)
	isbn := "isbn 10001"
	name := "book name"
	publisher := "pub"
	content := "book description"

	_, err := s.db.Exec("INSERT INTO books (id, isbn, name, publisher, content) VALUES ($1, $2, $3, $4, $5)", id, isbn, name, publisher, content)
	require.Nil(err)

	r := New(s.db)
	book, err := r.GetByISBN(isbn)
	require.Nil(err)
	require.NotNil(book)
	assert.Equal(id, book.ID)
	assert.Equal(name, book.Name)
	assert.Equal(publisher, book.Publisher)
	assert.Equal(content, book.Content)
}

func (s *repoTestSuite) TestCreate() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	r := New(s.db)
	b, err := r.Create(book.Book{
		Name:      "name",
		Isbn:      "isbn",
		Authors:   nil,
		Publisher: "publisher",
		Content:   "content",
	})
	require.Nil(err)

	rows, err := s.db.Query("SELECT id, name, isbn FROM books")
	require.Nil(err)
	require.True(rows.Next())

	var rb book.Book
	rows.Scan(&rb.ID, &rb.Name, &rb.Isbn)

	assert.NotNil(rb.ID)
	assert.Equal(b.Isbn, rb.Isbn)
	assert.Equal(b.Name, rb.Name)
}
