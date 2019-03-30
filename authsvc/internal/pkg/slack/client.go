package slack

import (
	"context"
	"encoding/json"
	"fmt"
	"net/http"

	"golang.org/x/oauth2"
)

const slackIdentityAPI = "https://slack.com/api/users.identity?token="

// type SlackOauth struct {
// 	*oauth2.Config
// }

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

func GetUserDataFromOauthCode(so *oauth2.Config, code string) (*IdentityResp, error) {
	token, err := so.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange wrong: %s", err.Error())
	}
	r, err := http.Get(slackIdentityAPI + token.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer r.Body.Close()

	resp := &IdentityResp{}
	err = json.NewDecoder(r.Body).Decode(&resp)
	if err != nil {
		return nil, fmt.Errorf("failed to parse user info: %s", err)
	}
	return resp, nil
}
