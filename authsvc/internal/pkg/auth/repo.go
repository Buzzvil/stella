package auth

import (
	"golang.org/x/oauth2"
)

// Repo is interface of user repo.
type Repo interface {
	GetUserByID(id int) (*User, error)
	GetUserBySlackUserID(sid string) (*User, error)
	CreateUser(u *User) error
}

type SlackRepo interface {
	GetUserData(token *oauth2.Token) (*User, error)
}
