package main

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/slack"
)

var slackOauthConfig = &oauth2.Config{
	RedirectURL:  "http://localhost:30082/auth/slack/callback",
	ClientID:     os.Getenv("SLACK_OAUTH_CLIENT_ID"),
	ClientSecret: os.Getenv("SLACK_OAUTH_CLIENT_SECRET"),
	Scopes:       []string{"identity.basic", "identity.avatar"},
	Endpoint:     slack.Endpoint,
}

const slackIdentityAPI = "https://slack.com/api/users.identity?token="

func oauthSlackLogin(w http.ResponseWriter, r *http.Request) {
	oauthState := generateStateOauthCookie(w)
	u := slackOauthConfig.AuthCodeURL(oauthState)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func oauthSlackCallback(w http.ResponseWriter, r *http.Request) {
	oauthState, _ := r.Cookie("oauthstate")

	if r.FormValue("state") != oauthState.Value {
		log.Println("invalid oauth slack state")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	identityResp, err := getUserDataFromSlack(r.FormValue("code"))
	if err != nil {
		log.Println(err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	fmt.Fprintf(w, "UserInfo: %+v\n", identityResp)
}

func generateStateOauthCookie(w http.ResponseWriter) string {
	var expiration = time.Now().Add(365 * 24 * time.Hour)

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	cookie := http.Cookie{Name: "oauthstate", Value: state, Expires: expiration}
	http.SetCookie(w, &cookie)

	return state
}

type slackIdentityResp struct {
	Ok   bool
	User slackUser
	Team slackTeam
}
type slackUser struct {
	ID    string
	Name  string
	Image string `json:"image_512"`
}
type slackTeam struct {
	ID string
}

func getUserDataFromSlack(code string) (*slackIdentityResp, error) {
	token, err := slackOauthConfig.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange wrong: %s", err.Error())
	}
	r, err := http.Get(slackIdentityAPI + token.AccessToken)
	if err != nil {
		return nil, fmt.Errorf("failed getting user info: %s", err.Error())
	}
	defer r.Body.Close()

	resp := &slackIdentityResp{}
	err = json.NewDecoder(r.Body).Decode(&resp)
	if err != nil {
		return nil, fmt.Errorf("failed to parse user info: %s", err)
	}
	return resp, nil
}

func health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func main() {
	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()

	mux := http.NewServeMux()

	mux.HandleFunc("/auth/slack/login", oauthSlackLogin)
	mux.HandleFunc("/auth/slack/callback", oauthSlackCallback)
	mux.HandleFunc("/health", health)

	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Println(err)
	}
	return
}
