package slackrepo

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"

	"golang.org/x/oauth2"
)

const slackIdentityAPI = "https://slack.com/api/users.identity?token="

type repo struct {
	oauthConfig *oauth2.Config
}

type IdentityResp struct {
	Ok bool
	User
	Team
}

type User struct {
	ID    string
	Name  string
	Image string `json:"image_512"`
}

type Team struct {
	ID string
}

func New(c *oauth2.Config) auth.SlackRepo {
	return &repo{oauthConfig: c}
}

func (r *repo) GetUserData(token *oauth2.Token) (*auth.User, error) {
	resp, err := http.Get(slackIdentityAPI + token.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer resp.Body.Close()

	ir := &IdentityResp{}
	err = json.NewDecoder(resp.Body).Decode(&ir)
	if err != nil {
		return nil, fmt.Errorf("failed to parse user info: %s", err)
	}
	return &auth.User{
		Name:        ir.User.Name,
		SlackUserID: ir.User.ID,
		SlackTeamID: ir.Team.ID,
		Image:       ir.User.Image,
	}, nil
}
