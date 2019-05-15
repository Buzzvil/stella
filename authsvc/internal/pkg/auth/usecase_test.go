package auth_test

import (
	"testing"

	"github.com/stretchr/testify/assert"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"github.com/stretchr/testify/require"
)

func TestGetUserByID(t *testing.T) {
	r := new(auth.MockRepo)
	sr := new(auth.MockSlackRepo)
	u := auth.NewUsecase(r, sr)

	userID := 1000
	user := auth.User{
		ID:   userID,
		Name: "Foo",
	}
	t.Run("UserFound", func(t *testing.T) {
		r.On("GetUserByID", userID).Return(&user, nil).Once()
		ru, err := u.GetUserByID(userID)
		require.Nil(t, err)
		require.NotNil(t, user)
		assert.Equal(t, ru.ID, user.ID)
		r.AssertExpectations(t)
	})

	t.Run("UserNotFound", func(t *testing.T) {
		r.On("GetUserByID", userID).Return(nil, nil).Once()
		ru, err := u.GetUserByID(userID)
		require.Nil(t, err)
		assert.Nil(t, ru)
		r.AssertExpectations(t)
	})
}
