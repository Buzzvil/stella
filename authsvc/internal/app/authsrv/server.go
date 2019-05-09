package authsrv

import (
	"context"
	"fmt"
	"strconv"

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

type Server interface {
	ev.AuthorizationServer
}

type server struct {
	auth.Usecase
}

func New(u auth.Usecase) Server {
	return &server{u}
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

func (s *server) Check(c context.Context, r *ev.CheckRequest) (*ev.CheckResponse, error) {
	// a, ok := r.GetAttributes().GetRequest().GetHttp().GetHeaders()[headerKeyAuthorization]
	// if !ok {
	// 	return buildDeniedCheckResponse(fmt.Errorf("Authorization header is not specified")), nil
	// }

	// tokenString, err := parseAuthorizationToken(as)
	// if err != nil {
	// 	return buildDeniedCheckResponse(err), nil
	// }

	// a, err := s.u.GetAuth(tokenString)
	// if err != nil {
	// 	return &ev.CheckResponse{
	// 		Status:       &rpc.Status{Code: int32(rpc.UNAUTHENTICATED)},
	// 		HttpResponse: &ev.CheckResponse_DeniedResponse{},
	// 	}, nil
	// }
	id := 1

	return buildOkCheckResponse(id), nil
}
