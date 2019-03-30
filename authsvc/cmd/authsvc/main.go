package main

import (
	"context"
	"database/sql"
	"log"
	"net/http"
	"os"

	"github.com/Buzzvil/stella/authsvc/internal/app/webauthsrv"
	"google.golang.org/grpc"
	"google.golang.org/grpc/grpclog"

	"github.com/Buzzvil/stella/authsvc/internal/app/authsrv"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"

	ev "github.com/envoyproxy/go-control-plane/envoy/service/auth/v2"
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

var jwtSigningKey = []byte("test stella signing key")

func health(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func main() {
	db, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatalf("Failed to open database: %v", err)
	}

	r := auth.NewPGRepo(db)
	u := auth.NewUsecase(r)
	srv := authsrv.New(u)
	websrv := webauthsrv.New(u, slackOauthConfig)

	if err != nil {
		grpclog.Fatalf("failed to listen: %v", err)
	}

	opts := []grpc.ServerOption{}
	grpcServer := grpc.NewServer(opts...)

	ev.RegisterAuthorizationServer(grpcServer, srv)

	mux := http.NewServeMux()
	mux.Handle("/auth/", http.StripPrefix("/auth", websrv))
	mux.HandleFunc("/health", health)
	mux.Handle("/", grpcServer)

	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Println(err)
	}
	return
}
