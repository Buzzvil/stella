package webauthsrv

import (
	"net/http"

	"golang.org/x/oauth2"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
)

// Config contains server configurations.
type Config struct {
	WebHost          string
	JWTSigningKey    []byte
	Usecase          auth.Usecase
	SlackOauthConfig *oauth2.Config
}

type server struct {
	webHost          string
	jwtSigningKey    []byte
	u                auth.Usecase
	slackOauthConfig *oauth2.Config
}

type user struct {
	ID          int
	Name        string
	SlackUserID string
	SlackTeamID string
	Image       string
}

// New initializes server.
func New(c Config) http.Handler {
	s := &server{
		c.WebHost,
		c.JWTSigningKey,
		c.Usecase,
		c.SlackOauthConfig,
	}
	mux := http.NewServeMux()
	mux.HandleFunc("/slack/login", s.OauthSlackLogin)
	mux.HandleFunc("/slack/callback", s.OauthSlackCallback)
	// mux.HandleFunc("/user", s.userProfile)
	return mux
}
