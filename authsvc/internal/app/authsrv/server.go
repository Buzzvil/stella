package authsrv

import (
	"context"
	"fmt"
	"strconv"
	"strings"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/jwt"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"github.com/gogo/googleapis/google/rpc"

	"github.com/envoyproxy/go-control-plane/envoy/api/v2/core"
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

func buildDeniedCheckResponse(err error) *ev.CheckResponse {
	return &ev.CheckResponse{
		Status: &rpc.Status{Code: int32(rpc.INVALID_ARGUMENT)},
		HttpResponse: &ev.CheckResponse_DeniedResponse{
			DeniedResponse: &ev.DeniedHttpResponse{
				Headers: []*core.HeaderValueOption{
					&core.HeaderValueOption{
						Header: &core.HeaderValue{Key: "Content-Type", Value: "application/json"},
					},
				},
				Body: fmt.Sprintf(`{"error": "%v"}`, err),
			},
		},
	}
}

func buildOkCheckResponse(uid int) *ev.CheckResponse {
	return &ev.CheckResponse{
		HttpResponse: &ev.CheckResponse_OkResponse{
			OkResponse: &ev.OkHttpResponse{
				Headers: []*ec.HeaderValueOption{
					&ec.HeaderValueOption{
						Header: &ec.HeaderValue{
							Key:   headerKeyUserID,
							Value: strconv.Itoa(uid),
						},
					},
				},
			},
		},
	}
}

func parseAuthorizationToken(at string) (string, error) {
	if len(at) == 0 || strings.Index(at, "Bearer") < 0 {
		return "", fmt.Errorf("authorization header doesn't contain valid Bearer prefix")
	}

	return strings.Split(at, " ")[1], nil
}

func (s *server) Check(c context.Context, r *ev.CheckRequest) (*ev.CheckResponse, error) {
	a, ok := r.GetAttributes().GetRequest().GetHttp().GetHeaders()[headerKeyAuthorization]
	if !ok {
		return buildDeniedCheckResponse(fmt.Errorf("Authorization header is not specified")), nil
	}

	ts, err := parseAuthorizationToken(a)
	if err != nil {
		return buildDeniedCheckResponse(err), nil
	}

	claims, err := jwt.ParseUserToken(s.jwtSigningKey, ts)
	if err != nil {
		return buildDeniedCheckResponse(err), nil
	}
	return buildOkCheckResponse(claims.UserID), nil
}
