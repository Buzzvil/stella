package auth

import (
	"golang.org/x/oauth2"
)

// Usecase declares auth service interface.
type Usecase interface {
	GetUserByID(id int) (*User, error)
	FindOrCreateUserFromSlack(*oauth2.Token) (*User, error)
}

type usecase struct {
	r Repo
	s SlackRepo
}

// NewUsecase creates new auth service.
func NewUsecase(r Repo, s SlackRepo) Usecase {
	return &usecase{r: r, s: s}
}

func (uc *usecase) GetUserByID(id int) (*User, error) {
	return uc.r.GetUserByID(id)
}

func (uc *usecase) FindOrCreateUserFromSlack(token *oauth2.Token) (*User, error) {
	u, err := uc.s.GetUserData(token)
	if err != nil {
		return nil, err
	}
	u, err = uc.r.GetUserBySlackUserID(u.SlackUserID)
	if err != nil {
		return nil, err
	}
	if u == nil {
		err = uc.r.CreateUser(u)
		if err != nil {
			return nil, err
		}
	}
	return u, nil
}
