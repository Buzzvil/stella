package authsrv_test

import (
	"context"
	"fmt"
	"testing"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/jwt"

	"github.com/Buzzvil/stella/authsvc/internal/app/authsrv"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"

	ev "github.com/envoyproxy/go-control-plane/envoy/service/auth/v2"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"golang.org/x/oauth2"
)

type mockUsecase struct {
	mock.Mock
}

func (u *mockUsecase) GetUserByID(id int) (*auth.User, error) {
	args := u.Called(id)
	return args.Get(0).(*auth.User), args.Error(1)
}

func (u *mockUsecase) FindOrCreateUserFromSlack(t *oauth2.Token) (*auth.User, error) {
	args := u.Called(t)
	return args.Get(0).(*auth.User), args.Error(1)
}

func TestServerCheck(t *testing.T) {
	signingKey := []byte("key")
	u := new(mockUsecase)
	c := authsrv.Config{JWTSigningKey: signingKey, Usecase: u}
	s := authsrv.New(c)
	user := auth.User{ID: 1001}

	u.On("GetUserByID", user.ID).Return(&user).Once()

	t.Run("ValidToken", func(t *testing.T) {
		ts, err := jwt.SignedUserToken(signingKey, user.ID)
		require.Nil(t, err)
		req := ev.CheckRequest{
			Attributes: &ev.AttributeContext{
				Request: &ev.AttributeContext_Request{
					Http: &ev.AttributeContext_HttpRequest{
						Headers: map[string]string{"cookie": fmt.Sprintf("auth-token=%s", ts)},
					},
				},
			},
		}

		res, err := s.Check(context.Background(), &req)
		require.Nil(t, err)
		require.NotNil(t, res)
		assert.NotNil(t, res.GetOkResponse())
	})

	t.Run("InvalidToken", func(t *testing.T) {
		ts := "invalid token"
		req := ev.CheckRequest{
			Attributes: &ev.AttributeContext{
				Request: &ev.AttributeContext_Request{
					Http: &ev.AttributeContext_HttpRequest{
						Headers: map[string]string{"cookie": fmt.Sprintf("auth-token=%s", ts)},
					},
				},
			},
		}

		res, err := s.Check(context.Background(), &req)
		require.Nil(t, err)
		require.NotNil(t, res)
		assert.NotNil(t, res.GetDeniedResponse().GetBody())
	})
}
