package auth

// Repo is interface of user repo.
type Repo interface {
	GetUserByID(id int) (*User, error)
	GetUserBySlackUserID(sid string) (*User, error)
	CreateUser(u *User) error
}
