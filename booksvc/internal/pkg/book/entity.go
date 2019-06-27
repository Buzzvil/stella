package book

type Book struct {
	ID         int64
	Name       string
	Isbn       string
	Authors    []string
	Publisher  string
	Content    string
	CoverImage string
}
