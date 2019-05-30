package webauthsrv_test

import (
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"golang.org/x/oauth2"

	"github.com/stretchr/testify/mock"
)

type mockUsecase struct {
	mock.Mock
}

func (u *mockUsecase) GetUserByID(id int) (*auth.User, error) {
	args := u.Called(id)
	return args.Get(0).(*auth.User), args.Error(1)
}

func (u *mockUsecase) FindOrCreateUserFromSlack(t *oauth2.Token) (*auth.User, error) {
	args := u.Called(t)
	return args.Get(0).(*auth.User), args.Error(1)
}
