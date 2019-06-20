package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/Buzzvil/stella/authsvc/internal/app/webauthsrv"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/slackrepo"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/userrepo"
	pb "github.com/Buzzvil/stella/usersvc/pkg/proto"

	_ "github.com/lib/pq"
	"golang.org/x/oauth2"
	"golang.org/x/oauth2/slack"
	"google.golang.org/grpc"
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
	opts := []grpc.DialOption{grpc.WithInsecure()}
	conn, err := grpc.Dial(os.Getenv("USERSVC_ADDR"), opts...)
	if err != nil {
		log.Fatalf("failed to dial usersvc: %s", err)
	}
	defer conn.Close()
	client := pb.NewUserServiceClient(conn)

	r := userrepo.New(client)
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
	mux.HandleFunc("/", health)

	ctx := context.Background()
	ctx, cancel := context.WithCancel(ctx)
	defer cancel()
	if err := http.ListenAndServe(":8080", mux); err != nil {
		log.Println(err)
	}
	return
}
