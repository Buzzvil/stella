package webauthsrv

import (
	"context"
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"time"

	"golang.org/x/oauth2"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/jwt"
)

const oauthstateCookie = "oauthstate"

// AuthTokenCookie is token used for passing token between client/server
const AuthTokenCookie = "auth-token"

func generateStateOauthCookie(w http.ResponseWriter) string {
	var expiration = time.Now().Add(365 * 24 * time.Hour)

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	cookie := http.Cookie{Name: oauthstateCookie, Value: state, Expires: expiration}
	http.SetCookie(w, &cookie)

	return state
}

func exchangeTokenFromCode(c *oauth2.Config, code string) (*oauth2.Token, error) {
	token, err := c.Exchange(context.Background(), code)
	if err != nil {
		return nil, fmt.Errorf("code exchange wrong: %s", err.Error())
	}
	return token, nil
}

func (s *server) OauthSlackLogin(w http.ResponseWriter, r *http.Request) {
	oauthState := generateStateOauthCookie(w)
	u := s.slackOauthConfig.AuthCodeURL(oauthState)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func (s *server) OauthSlackCallback(w http.ResponseWriter, r *http.Request) {
	oauthState, err := r.Cookie(oauthstateCookie)
	if err != nil {
		log.Printf("oauth state parse error: %s\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	if r.FormValue("state") != oauthState.Value {
		log.Println("invalid oauth state")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	token, err := exchangeTokenFromCode(s.slackOauthConfig, r.FormValue("code"))
	if err != nil {
		log.Printf("failed to exchange token: %s\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	u, err := s.u.FindOrCreateUserFromSlack(token)
	if err != nil {
		log.Printf("failed to store slack user: %s\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	ss, err := jwt.SignedUserToken(s.jwtSigningKey, u.ID)
	if err != nil {
		log.Printf("failed to sign jwt token: %s\n", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	log.Println("successful")

	c := http.Cookie{
		Name:     AuthTokenCookie,
		Value:    ss,
		Expires:  time.Now().Add(jwt.TokenLifetime),
		HttpOnly: true,
		Path:     "/",
	}
	http.SetCookie(w, &c)
	http.Redirect(w, r, "/", http.StatusFound)
	return
}

func (s *server) Logout(w http.ResponseWriter, r *http.Request) {
	c := http.Cookie{
		Name:     AuthTokenCookie,
		Value:    "",
		HttpOnly: true,
		Path:     "/",
		MaxAge:   -1,
	}
	http.SetCookie(w, &c)
	http.Redirect(w, r, "/", http.StatusFound)
}

/*
func (s *server) userProfile(w http.ResponseWriter, r *http.Request) {
	id, err := strconv.Atoi(r.Header.Get("X-Forwarded-User"))
	if err != nil {
		w.WriteHeader(http.StatusForbidden)
		return
	}
	u, err := s.GetUserByID(id)
	if err != nil {
		log.Println(err)
		w.WriteHeader(http.StatusInternalServerError)
		return
	}
	if u == nil {
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	json.NewEncoder(w).Encode(u)
}
*/
