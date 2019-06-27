package authsrv

import (
	"context"
	"log"
	"net/http"
	"strconv"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/jwt"

	ec "github.com/envoyproxy/go-control-plane/envoy/api/v2/core"
	ev "github.com/envoyproxy/go-control-plane/envoy/service/auth/v2"
)

const (
	headerKeyAuthorization = "authorization"
	headerKeyUserID        = "User-ID"
)

// Server handles authorization requests.
type Server interface {
	ev.AuthorizationServer
}

type Config struct {
	JWTSigningKey []byte
	Usecase       auth.Usecase
}

type server struct {
	jwtSigningKey []byte
	u             auth.Usecase
}

// New returns new Server interface.
func New(c Config) Server {
	return &server{c.JWTSigningKey, c.Usecase}
}

func buildOkCheckResponse(uid int64) *ev.CheckResponse {
	headers := []*ec.HeaderValueOption{}
	if uid > 0 {
		headers = append(headers, &ec.HeaderValueOption{
			Header: &ec.HeaderValue{
				Key:   headerKeyUserID,
				Value: strconv.FormatInt(uid, 10),
			},
		})
	}
	return &ev.CheckResponse{
		HttpResponse: &ev.CheckResponse_OkResponse{
			OkResponse: &ev.OkHttpResponse{
				Headers: headers,
			},
		},
	}
}

func (s *server) Check(c context.Context, r *ev.CheckRequest) (*ev.CheckResponse, error) {
	h := http.Header{}
	h.Add("cookie", r.GetAttributes().GetRequest().GetHttp().GetHeaders()["cookie"])
	cookie, err := (&http.Request{Header: h}).Cookie("auth-token")
	if err != nil {
		log.Printf("failed to fetch cookie: %s\n", err)
		return buildOkCheckResponse(-1), nil
	}
	ts := cookie.Value

	claims, err := jwt.ParseUserToken(s.jwtSigningKey, ts)
	if err != nil {
		log.Printf("failed to validate jwt: %s\n", err)
		return buildOkCheckResponse(-1), nil
	}
	return buildOkCheckResponse(claims.UserID), nil
}
