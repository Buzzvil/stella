package pgrepo_test

import (
	"os"
	"testing"

	"github.com/jmoiron/sqlx"

	"github.com/Buzzvil/stella/usersvc/internal/pkg/user"
	"github.com/Buzzvil/stella/usersvc/internal/pkg/user/pgrepo"

	_ "github.com/lib/pq"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	"github.com/stretchr/testify/suite"
)

type repoTestSuite struct {
	suite.Suite
	db *sqlx.DB
}

func (s *repoTestSuite) SetupSuite() {
	db, err := sqlx.Open("postgres", os.Getenv("DATABASE_URL"))
	require.Nil(s.T(), err)
	s.db = db
}

func (s *repoTestSuite) SetupTest() {
	_, err := s.db.Exec("DELETE FROM users")
	require.Nil(s.T(), err)
}

func (s *repoTestSuite) TearDownSuite() {
	s.db.Close()
}

func (s *repoTestSuite) TestGetUser() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	var uid int64
	name := "test"
	slack_user_id := "suid"
	slack_team_id := "stid"
	image := "https://example.com/image.png"
	err := s.db.QueryRow("INSERT INTO users (name, slack_user_id, slack_team_id, image) VALUES ($1, $2, $3, $4) RETURNING id", name, slack_user_id, slack_team_id, image).Scan(&uid)
	require.Nil(err)

	r := pgrepo.New(s.db)
	as, err := r.GetUser(uid)
	require.Nil(err)
	assert.Equal(as.Name, name)
	assert.Equal(as.SlackUserID, slack_user_id)
	assert.Equal(as.SlackTeamID, slack_team_id)
	assert.Equal(as.Image, image)
}

func (s *repoTestSuite) TestGetUserNoRows() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	uid := int64(100)

	r := pgrepo.New(s.db)
	as, err := r.GetUser(uid)
	require.Nil(err)
	assert.Nil(as)
}

func (s *repoTestSuite) TestGetUserBySlackUserID() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	var uid int64
	name := "test"
	slack_user_id := "suid"
	slack_team_id := "stid"
	image := "https://example.com/image.png"
	err := s.db.QueryRow("INSERT INTO users (name, slack_user_id, slack_team_id, image) VALUES ($1, $2, $3, $4) RETURNING id", name, slack_user_id, slack_team_id, image).Scan(&uid)
	require.Nil(err)

	r := pgrepo.New(s.db)
	as, err := r.GetUserBySlackUserID(slack_user_id)
	require.Nil(err)
	assert.Equal(as.ID, uid)
	assert.Equal(as.Name, name)
	assert.Equal(as.SlackTeamID, slack_team_id)
	assert.Equal(as.Image, image)
}

func (s *repoTestSuite) TestGetUserBySlackUserIDNowRows() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	slack_user_id := "suid"

	r := pgrepo.New(s.db)
	as, err := r.GetUserBySlackUserID(slack_user_id)
	require.Nil(err)
	assert.Nil(as, nil)
}

func (s *repoTestSuite) TestCreateUser() {
	require := require.New(s.T())
	assert := assert.New(s.T())

	u := &user.User{
		Name:        "Foo",
		SlackUserID: "suid",
		SlackTeamID: "stid",
		Image:       "img_url",
	}

	r := pgrepo.New(s.db)
	ru, err := r.CreateUser(u)
	require.Nil(err)
	assert.NotZero(ru.ID)
}

func TestRepoTestSuite(t *testing.T) {
	suite.Run(t, new(repoTestSuite))
}
