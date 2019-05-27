package webauthsrv_test

import (
	"fmt"
	"net/http"
	"net/http/httptest"
	"testing"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"

	"golang.org/x/oauth2"
	"golang.org/x/oauth2/slack"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/suite"

	"github.com/Buzzvil/stella/authsvc/internal/app/webauthsrv"

	"github.com/stretchr/testify/require"
)

type handlerTestSuite struct {
	suite.Suite
	signingKey       []byte
	usecase          auth.Usecase
	webHost          string
	slackOauthConfig *oauth2.Config
}

func (s *handlerTestSuite) SetupSuite() {
	s.usecase = new(mockUsecase)
	s.signingKey = []byte("key")
	s.webHost = "https://example.com"
	oc := &oauth2.Config{
		RedirectURL:  fmt.Sprintf("%s/auth/slack/callback", s.webHost),
		ClientID:     "clientid",
		ClientSecret: "clientsecret",
		Scopes:       []string{"identity.basic", "identity.avatar"},
		Endpoint:     slack.Endpoint,
	}
	s.slackOauthConfig = oc
}

func (s *handlerTestSuite) TestOauthSlackLogin() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	c := webauthsrv.Config{WebHost: s.webHost, JWTSigningKey: s.signingKey, Usecase: s.usecase, SlackOauthConfig: s.slackOauthConfig}
	srv := webauthsrv.New(c)

	req, err := http.NewRequest("GET", "/slack/login", nil)
	require.Nil(err)

	rr := httptest.NewRecorder()
	srv.ServeHTTP(rr, req)
	req = &http.Request{Header: http.Header{"Cookie": rr.HeaderMap["Set-Cookie"]}}

	assert.Equal(http.StatusTemporaryRedirect, rr.Code)
	assert.Contains(rr.Header().Get("Location"), slack.Endpoint.AuthURL)
	assert.NotZero(req.Cookie("oauthstate"))
}

func (s *handlerTestSuite) TestOauthSlackCallback() {
	t := s.T()
	require := require.New(t)
	assert := assert.New(t)

	c := webauthsrv.Config{WebHost: s.webHost, JWTSigningKey: s.signingKey, Usecase: s.usecase, SlackOauthConfig: s.slackOauthConfig}
	srv := webauthsrv.New(c)

	t.Run("NoOauthState", func(t *testing.T) {
		req, err := http.NewRequest("GET", "/slack/callback", nil)
		require.Nil(err)

		rr := httptest.NewRecorder()
		srv.ServeHTTP(rr, req)

		assert.Equal(http.StatusTemporaryRedirect, rr.Code)
		assert.Zero(req.Cookie("auth-token"))
	})
}

func TestHandlerTestSuite(t *testing.T) {
	suite.Run(t, new(handlerTestSuite))
}
