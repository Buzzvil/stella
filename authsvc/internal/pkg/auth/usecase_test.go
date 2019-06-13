package auth_test

import (
	"testing"

	"golang.org/x/oauth2"

	"github.com/stretchr/testify/assert"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"github.com/stretchr/testify/require"
)

func TestGetUserByID(t *testing.T) {
	r := new(auth.MockUserRepo)
	sr := new(auth.MockSlackRepo)
	u := auth.NewUsecase(r, sr)

	userID := int64(1000)
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

func TestFindOrCreateUserFromSlack(t *testing.T) {
	r := new(auth.MockUserRepo)
	sr := new(auth.MockSlackRepo)
	u := auth.NewUsecase(r, sr)

	userID := int64(1000)
	slackUserID := "suid"
	slackTeamID := "stid"
	user := auth.User{
		Name:        "Foo",
		SlackUserID: slackUserID,
		SlackTeamID: slackTeamID,
		Image:       "image",
	}
	dbUser := user
	dbUser.ID = userID
	token := &oauth2.Token{}

	t.Run("NewUser", func(t *testing.T) {
		sr.On("GetUserData", token).Return(&user, nil).Once()
		r.On("GetUserBySlackUserID", slackUserID).Return(nil, nil).Once()
		r.On("CreateUser", &user).Return(&dbUser, nil).Once()
		ru, err := u.FindOrCreateUserFromSlack(token)
		require.Nil(t, err)
		require.NotNil(t, ru)
		assert.NotZero(t, ru.ID)
		sr.AssertExpectations(t)
		r.AssertExpectations(t)
	})

	t.Run("ExistingUser", func(t *testing.T) {
		sr.On("GetUserData", token).Return(&user, nil).Once()
		r.On("GetUserBySlackUserID", slackUserID).Return(&dbUser, nil).Once()
		ru, err := u.FindOrCreateUserFromSlack(token)
		require.Nil(t, err)
		require.NotNil(t, ru)
		assert.NotZero(t, ru.ID)
		sr.AssertExpectations(t)
		r.AssertExpectations(t)
	})
}
