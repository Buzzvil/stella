package pgrepo

import (
	"database/sql"
	"fmt"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
)

type repo struct {
	*sql.DB
}

// NewPGRepo returns a new pgrepo instance.
func NewPGRepo(db *sql.DB) auth.Repo {
	return &repo{db}
}

func (r *repo) GetUserByID(id int) (*auth.User, error) {
	u := &auth.User{}
	row := r.DB.QueryRow("SELECT id, name, slack_user_id, slack_team_id, image FROM users WHERE id = $1", id)
	err := row.Scan(&u.ID, &u.Name, &u.SlackUserID, &u.SlackTeamID, &u.Image)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to fetch user: %s", err)
	}
	return u, nil
}

func (r *repo) GetUserBySlackUserID(sid string) (*auth.User, error) {
	u := &auth.User{}
	row := r.DB.QueryRow("SELECT id, name, slack_user_id, slack_team_id, image FROM users WHERE slack_user_id = $1", sid)
	err := row.Scan(&u.ID, &u.Name, &u.SlackUserID, &u.SlackTeamID, &u.Image)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, nil
		}
		return nil, fmt.Errorf("failed to fetch user: %s", err)
	}
	return u, nil
}

func (r *repo) CreateUser(u *auth.User) error {
	q := `
		INSERT INTO users (name, slack_user_id, slack_team_id, image)
		VALUES ($1, $2, $3, $4)
		RETURNING id`
	if err := r.DB.QueryRow(q, u.Name, u.SlackUserID, u.SlackTeamID, u.Image).Scan(&u.ID); err != nil {
		return fmt.Errorf("failed to create user: %s", err)
	}
	return nil
}
