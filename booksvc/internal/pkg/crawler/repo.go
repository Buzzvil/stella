package crawler

// Repo declares book repository interface.
type Repo interface {
	Find(query string) (*Book, error)
}
