package crawler

// Repo declares book repository interface.
type Repo interface {
	Search(query string) (*Book, error)
}
