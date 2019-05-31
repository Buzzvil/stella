package auth

import (
	"github.com/stretchr/testify/mock"
	"golang.org/x/oauth2"
)

type MockUserRepo struct {
	mock.Mock
}

func (r *MockUserRepo) GetUserByID(id int64) (*User, error) {
	args := r.Called(id)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*User), args.Error(1)
}

func (r *MockUserRepo) GetUserBySlackUserID(sid string) (*User, error) {
	args := r.Called(sid)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*User), args.Error(1)
}

func (r *MockUserRepo) CreateUser(u *User) (*User, error) {
	args := r.Called(u)
	if args.Get(0) == nil {
		return nil, args.Error(1)
	}
	return args.Get(0).(*User), args.Error(1)
}

type MockSlackRepo struct {
	mock.Mock
}

func (r *MockSlackRepo) GetUserData(token *oauth2.Token) (*User, error) {
	args := r.Called(token)
	return args.Get(0).(*User), args.Error(1)
}
