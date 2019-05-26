package auth

import (
	"golang.org/x/oauth2"
)

// Repo is interface of user repo.
type UserRepo interface {
	GetUserByID(id int64) (*User, error)
	GetUserBySlackUserID(sid string) (*User, error)
	CreateUser(u *User) (*User, error)
}

type SlackRepo interface {
	GetUserData(token *oauth2.Token) (*User, error)
}
