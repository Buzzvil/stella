package webauthsrv

import (
	"crypto/rand"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
	"strings"
	"time"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/slack"

	"golang.org/x/oauth2"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"github.com/dgrijalva/jwt-go"
)

var jwtSigningKey = []byte("test stella signing key")

type Server interface {
}

type server struct {
	auth.Usecase
	slackOauthConfig *oauth2.Config
}

type authClaims struct {
	UserID int `json:"user_id"`
	jwt.StandardClaims
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
	ss, err := token.SignedString(jwtSigningKey)
	if err != nil {
		log.Printf("failed to sign jwt token: %s", err)
	}

	fmt.Fprintf(w, "%s", ss)
}

type user struct {
	ID          int
	Name        string
	SlackUserID string
	SlackTeamID string
	Image       string
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

func New(u auth.Usecase, c *oauth2.Config) http.Handler {
	s := &server{u, c}
	return s.NewHandler()
}

func (s *server) NewHandler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("/slack/login", s.oauthSlackLogin)
	mux.HandleFunc("/slack/callback", s.oauthSlackCallback)
	// mux.HandleFunc("/verify", s.verify)
	// mux.HandleFunc("/user", s.userProfile)
	return mux
}
