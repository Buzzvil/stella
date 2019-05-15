package main

import (
	"context"
	"database/sql"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/slackrepo"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/pgrepo"

	"github.com/Buzzvil/stella/authsvc/internal/app/webauthsrv"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"

	_ "github.com/lib/pq"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/slack"
)

var webHost = os.Getenv("WEB_HOST")

var slackOauthConfig = &oauth2.Config{
	RedirectURL:  fmt.Sprintf("%s/auth/slack/callback", webHost),
	ClientID:     os.Getenv("SLACK_OAUTH_CLIENT_ID"),
	ClientSecret: os.Getenv("SLACK_OAUTH_CLIENT_SECRET"),
	Scopes:       []string{"identity.basic", "identity.avatar"},
	Endpoint:     slack.Endpoint,
}

var jwtSigningKey = []byte(os.Getenv("JWT_SIGNING_KEY"))

func health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func main() {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}

	r := pgrepo.New(db)
	sr := slackrepo.New(slackOauthConfig)
	u := auth.NewUsecase(r, sr)
	c := webauthsrv.Config{
		WebHost:          webHost,
		JWTSigningKey:    jwtSigningKey,
		Usecase:          u,
		SlackOauthConfig: slackOauthConfig,
	}
	websrv := webauthsrv.New(c)

	mux := http.NewServeMux()
	mux.Handle("/auth/", http.StripPrefix("/auth", websrv))
	mux.HandleFunc("/health", health)

	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Println(err)
	}
	return
}
