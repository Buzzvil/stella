package auth

import (
	"github.com/stretchr/testify/mock"
	"golang.org/x/oauth2"
)

type MockRepo struct {
	mock.Mock
}

func (r *MockRepo) GetUserByID(id int) (*User, error) {
	args := r.Called(id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*User), args.Error(1)
}

func (r *MockRepo) GetUserBySlackUserID(sid string) (*User, error) {
	args := r.Called(sid)
	return args.Get(0).(*User), args.Error(1)
}

func (r *MockRepo) CreateUser(u *User) error {
	args := r.Called(u)
	return args.Error(1)
}

type MockSlackRepo struct {
	mock.Mock
}

func (r *MockSlackRepo) GetUserData(token *oauth2.Token) (*SlackUser, error) {
	args := r.Called(token)
	return args.Get(0).(*SlackUser), args.Error(1)
}
