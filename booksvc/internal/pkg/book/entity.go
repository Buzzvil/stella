package book

// Book has ID and book information
type Book struct {
	ID int64
	BookInfo
}

// BookInfo has information of book
type BookInfo struct {
	Name       string
	Isbn       string
	Authors    []string
	Publisher  string
	Content    string
	CoverImage string
}
