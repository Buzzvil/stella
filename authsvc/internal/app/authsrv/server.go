package authsrv

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"strconv"

	"google.golang.org/grpc/codes"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/jwt"
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

func buildDeniedCheckResponse(code codes.Code, err error) *ev.CheckResponse {
	return &ev.CheckResponse{
		Status: &rpc.Status{Code: int32(code)},
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

func buildOkCheckResponse(uid int64) *ev.CheckResponse {
	return &ev.CheckResponse{
		HttpResponse: &ev.CheckResponse_OkResponse{
			OkResponse: &ev.OkHttpResponse{
				Headers: []*ec.HeaderValueOption{
					&ec.HeaderValueOption{
						Header: &ec.HeaderValue{
							Key:   headerKeyUserID,
							Value: strconv.FormatInt(uid, 10),
						},
					},
				},
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
		return buildDeniedCheckResponse(codes.Unauthenticated, fmt.Errorf("failed to authorize")), nil
	}
	ts := cookie.Value

	claims, err := jwt.ParseUserToken(s.jwtSigningKey, ts)
	if err != nil {
		return buildDeniedCheckResponse(codes.Unauthenticated, fmt.Errorf("failed to authorize")), nil
	}
	return buildOkCheckResponse(claims.UserID), nil
}
