package webauthsrv

import (
	"crypto/rand"
	"encoding/base64"
	"log"
	"net/http"
	"time"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/jwt"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/slack"
)

func generateStateOauthCookie(w http.ResponseWriter) string {
	var expiration = time.Now().Add(365 * 24 * time.Hour)

	b := make([]byte, 16)
	rand.Read(b)
	state := base64.URLEncoding.EncodeToString(b)
	cookie := http.Cookie{Name: "oauthstate", Value: state, Expires: expiration}
	http.SetCookie(w, &cookie)

	return state
}

func (s *server) oauthSlackLogin(w http.ResponseWriter, r *http.Request) {
	oauthState := generateStateOauthCookie(w)
	u := s.slackOauthConfig.AuthCodeURL(oauthState)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func (s *server) oauthSlackCallback(w http.ResponseWriter, r *http.Request) {
	oauthState, _ := r.Cookie("oauthstate")

	if r.FormValue("state") != oauthState.Value {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	resp, err := slack.GetUserDataFromOauthCode(s.slackOauthConfig, r.FormValue("code"))
	if err != nil {
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	u, err := s.u.FindOrCreateUserFromIdentity(resp)
	if err != nil {
		log.Printf("failed to fetch user: %s", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	ss, err := jwt.SignedUserToken(s.jwtSigningKey, u.ID)
	if err != nil {
		log.Printf("failed to sign jwt token: %s", err)
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	c := http.Cookie{
		Name:   "auth-token",
		Value:  ss,
		Secure: true,
		Path:   "/",
	}
	http.SetCookie(w, &c)
	http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
	return
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
