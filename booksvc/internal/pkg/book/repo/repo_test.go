package repo_test

import (
	"database/sql"
	"os"
	"testing"

	"github.com/Buzzvil/stella/booksvc/internal/pkg/book"
	"github.com/Buzzvil/stella/booksvc/internal/pkg/book/repo"
	_ "github.com/lib/pq"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"

	"github.com/bxcodec/faker"
)

type repoTestSuite struct {
	suite.Suite
	db   *sql.DB
	repo book.Repo
}

func TestRepoTestSuite(t *testing.T) {
	suite.Run(t, new(repoTestSuite))
}

func (s *repoTestSuite) SetupSuite() {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	require.Nil(s.T(), err)
	s.db = db
	s.repo = repo.New(s.db)
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

	book, err := s.repo.GetByID(id)
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

	book, err := s.repo.GetByISBN(isbn)
	require.Nil(err)
	require.NotNil(book)
	assert.Equal(id, book.ID)
	assert.Equal(name, book.Name)
	assert.Equal(publisher, book.Publisher)
	assert.Equal(content, book.Content)
}

func (s *repoTestSuite) TestGetByFilter() {
	tests := []struct {
		name  string
		books []*book.Book
		query string
		want  int
	}{
		{
			name: "Title and Author matches",
			books: []*book.Book{
				&book.Book{
					Name:    "Harry Potter",
					Authors: []string{"J.K. Rowling"},
					Isbn:    "a",
				},
				&book.Book{
					Authors: []string{"Harry Styles"},
					Isbn:    "b",
				},
			},
			query: "Harry",
			want:  2,
		},
		{
			name: "Title matches",
			books: []*book.Book{
				&book.Book{
					Name:    "Harry Potter",
					Authors: []string{"J.K. Rowling"},
					Isbn:    "a",
				},
				&book.Book{
					Authors: []string{"Tolkien"},
					Isbn:    "b",
				},
			},
			query: "Harry",
			want:  1,
		},
	}

	for _, tt := range tests {
		s.T().Run(tt.name, func(t *testing.T) {
			s.SetupTest()
			for _, book := range tt.books {
				_, err := s.db.Exec("INSERT INTO books (isbn, name, authors, publisher, content, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6)", book.Isbn, book.Name, book.Authors[0], book.Publisher, book.Content, book.CoverImage)
				s.NoError(err)
			}
			res, err := s.repo.GetByFilter(tt.query)
			s.NoError(err)
			s.Equal(tt.want, len(res))
		})
	}
}

func (s *repoTestSuite) TestGetByIDs() {
	var books []*book.Book
	s.NoError(faker.FakeData(&books))
	bookIDs := make([]int64, 0)
	bookID := int64(1)
	for _, book := range books {
		if len(book.Authors) == 0 {
			continue
		}
		_, err := s.db.Exec("INSERT INTO books (id, isbn, name, authors, publisher, content, cover_image_url) VALUES ($1, $2, $3, $4, $5, $6, $7)", bookID, book.Isbn, book.Name, book.Authors[0], book.Publisher, book.Content, book.CoverImage)
		s.NoError(err)
		bookIDs = append(bookIDs, bookID)
		bookID++
	}

	res, err := s.repo.GetByIDs(bookIDs)
	s.NoError(err)
	s.Equal(len(bookIDs), len(res))
}

func (s *repoTestSuite) TestCreate() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	b, err := s.repo.Create(book.Book{
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
