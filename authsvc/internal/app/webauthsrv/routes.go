package webauthsrv

import (
	"crypto/rand"
	"encoding/base64"
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/slack"
	"github.com/dgrijalva/jwt-go"
)

type authClaims struct {
	UserID int `json:"user_id"`
	jwt.StandardClaims
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

func (s *server) oauthSlackLogin(w http.ResponseWriter, r *http.Request) {
	oauthState := generateStateOauthCookie(w)
	u := s.slackOauthConfig.AuthCodeURL(oauthState)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func (s *server) oauthSlackCallback(w http.ResponseWriter, r *http.Request) {
	oauthState, _ := r.Cookie("oauthstate")

	if r.FormValue("state") != oauthState.Value {
		log.Println("invalid oauth slack state")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	resp, err := slack.GetUserDataFromOauthCode(s.slackOauthConfig, r.FormValue("code"))
	if err != nil {
		log.Println(err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	u, err := s.Usecase.FindOrCreateUserFromIdentity(resp)

	claims := authClaims{
		u.ID,
		jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
			Issuer:    "authsvc",
		},
	}
	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)
	ss, err := token.SignedString(s.jwtSigningKey)
	if err != nil {
		log.Printf("failed to sign jwt token: %s", err)
	}

	fmt.Fprintf(w, "%s", ss)
}

/*
func (*server) verify(w http.ResponseWriter, r *http.Request) {
	if r.Header.Get("Authorization") == "" {
		w.WriteHeader(http.StatusOK)
		return
	}
	log.Println("verifying request")
	s := strings.Split(r.Header.Get("Authorization"), " ")[1]
	token, err := jwt.ParseWithClaims(s, &authClaims{}, func(token *jwt.Token) (interface{}, error) {
		return jwtSigningKey, nil
	})
	if err != nil {
		log.Printf("failed to parse jwt token: %s", err)
		w.WriteHeader(http.StatusUnauthorized)
		return
	}
	if claims, ok := token.Claims.(*authClaims); ok && token.Valid {
		log.Printf("Verified UserID: %d", claims.UserID)
		w.Header().Set("X-Forwarded-User", strconv.Itoa(claims.UserID))
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
	}
}

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
