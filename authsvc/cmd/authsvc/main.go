package main

import (
	"context"
	"crypto/rand"
	"database/sql"
	"encoding/base64"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"strconv"
	"strings"
	"time"

	"github.com/dgrijalva/jwt-go"

	_ "github.com/lib/pq"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/slack"
)

var slackOauthConfig = &oauth2.Config{
	RedirectURL:  "http://localhost:30080/auth/slack/callback",
	ClientID:     os.Getenv("SLACK_OAUTH_CLIENT_ID"),
	ClientSecret: os.Getenv("SLACK_OAUTH_CLIENT_SECRET"),
	Scopes:       []string{"identity.basic", "identity.avatar"},
	Endpoint:     slack.Endpoint,
}

const slackIdentityAPI = "https://slack.com/api/users.identity?token="

var jwtSigningKey = []byte("test stella signing key")

type authClaims struct {
	UserID int64 `json:"user_id"`
	jwt.StandardClaims
}

func (*server) oauthSlackLogin(w http.ResponseWriter, r *http.Request) {
	oauthState := generateStateOauthCookie(w)
	u := slackOauthConfig.AuthCodeURL(oauthState)
	http.Redirect(w, r, u, http.StatusTemporaryRedirect)
}

func (s *server) oauthSlackCallback(w http.ResponseWriter, r *http.Request) {
	oauthState, _ := r.Cookie("oauthstate")

	if r.FormValue("state") != oauthState.Value {
		log.Println("invalid oauth slack state")
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}
	resp, err := getUserDataFromSlack(r.FormValue("code"))
	if err != nil {
		log.Println(err.Error())
		http.Redirect(w, r, "/", http.StatusTemporaryRedirect)
		return
	}

	u, err := s.GetUserBySlackUserID(resp.User.ID)
	if err != nil {
		log.Println(err)
	}
	if u == nil {
		u = &user{
			Name:        resp.User.Name,
			SlackUserID: resp.User.ID,
			SlackTeamID: resp.Team.ID,
			Image:       resp.User.Image,
		}
		err = s.CreateUser(u)
		if err != nil {
			log.Printf("failed to create user: %s", err)
			fmt.Fprintf(w, "failed to create user")
			return
		}
	}

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
	ID          int64
	Name        string
	SlackUserID string
	SlackTeamID string
	Image       string
}

func (s *server) GetUserBySlackUserID(id string) (*user, error) {
	u := &user{}
	row := s.DB.QueryRow("SELECT id, name, slack_user_id, slack_team_id, image FROM users WHERE slack_user_id = $1", id)
	err := row.Scan(&u.ID, &u.Name, &u.SlackUserID, &u.SlackTeamID, &u.Image)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to fetch user: %s", err)
	}
	return u, nil
}

func (s *server) CreateUser(u *user) error {
	q := `
		INSERT INTO users (name, slack_user_id, slack_team_id, image)
		VALUES ($1, $2, $3, $4)
		RETURNING id`
	if err := s.DB.QueryRow(q, u.Name, u.SlackUserID, u.SlackTeamID, u.Image).Scan(&u.ID); err != nil {
		return fmt.Errorf("failed to create user: %s", err)
	}
	return nil
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
		w.Header().Set("X-Forwarded-User", strconv.FormatInt(claims.UserID, 10))
		w.WriteHeader(http.StatusOK)
	} else {
		w.WriteHeader(http.StatusUnauthorized)
	}
}

func (*server) health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

type server struct {
	*sql.DB
}

func newServer(db *sql.DB) *server {
	return &server{db}
}

func (s *server) Run(ctx context.Context) error {
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	mux := http.NewServeMux()

	mux.HandleFunc("/auth/slack/login", s.oauthSlackLogin)
	mux.HandleFunc("/auth/slack/callback", s.oauthSlackCallback)
	mux.HandleFunc("/auth/verify", s.verify)
	mux.HandleFunc("/health", s.health)

	return http.ListenAndServe(":8080", mux)
}

func main() {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}

	s := newServer(db)

	ctx := context.Background()
	if err := s.Run(ctx); err != nil {
		log.Println(err)
	}
	return
}
