package auth

import (
	"golang.org/x/oauth2"
)

// Usecase declares auth service interface.
type Usecase interface {
	GetUserByID(id int) (*User, error)
	GetSlackUser(token *oauth2.Token) (*SlackUser, error)
	FindOrCreateUserFromSlackUser(*SlackUser) (*User, error)
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

func (uc *usecase) GetSlackUser(token *oauth2.Token) (*SlackUser, error) {
	return uc.s.GetUserData(token)
}

func (uc *usecase) FindOrCreateUserFromSlackUser(r *SlackUser) (*User, error) {
	u, err := uc.r.GetUserBySlackUserID(r.ID)
	if err != nil {
		return nil, err
	}
	if u == nil {
		u = &User{
			Name:        r.Name,
			SlackUserID: r.ID,
			SlackTeamID: r.TeamID,
			Image:       r.Image,
		}
		err = uc.r.CreateUser(u)
		if err != nil {
			return nil, err
		}
	}
	return u, nil
}
