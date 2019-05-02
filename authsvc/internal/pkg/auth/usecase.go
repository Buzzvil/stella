package auth

import (
	"github.com/Buzzvil/stella/authsvc/internal/pkg/slack"
)

// Usecase declares auth service interface.
type Usecase interface {
	GetUserByID(id int) (*User, error)
	FindOrCreateUserFromIdentity(*slack.IdentityResp) (*User, error)
}

type usecase struct {
	Repo
}

// NewUsecase creates new auth service.
func NewUsecase(repo Repo) Usecase {
	return &usecase{repo}
}

func (uc *usecase) GetUserByID(id int) (*User, error) {
	return uc.GetUserByID(id)
}

func (uc *usecase) FindOrCreateUserFromIdentity(r *slack.IdentityResp) (*User, error) {
	u, err := uc.Repo.GetUserBySlackUserID(r.User.ID)
	if err != nil {
		return nil, err
	}
	if u == nil {
		u = &User{
			Name:        r.User.Name,
			SlackUserID: r.User.ID,
			SlackTeamID: r.Team.ID,
			Image:       r.User.Image,
		}
		err = uc.Repo.CreateUser(u)
		if err != nil {
			return nil, err
		}
	}
	return u, nil
}
