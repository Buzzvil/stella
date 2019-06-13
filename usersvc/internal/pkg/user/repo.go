package user

// Repo is interface of user repo.
type Repo interface {
	GetUser(id int64) (*User, error)
	GetUsers(ids []int64) ([]*User, error)
	GetUserBySlackUserID(sid string) (*User, error)
	CreateUser(u *User) (*User, error)
}
