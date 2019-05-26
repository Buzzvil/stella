package pgrepo

import (
	"database/sql"
	"fmt"

	"github.com/jmoiron/sqlx"
	_ "github.com/lib/pq"

	"github.com/Buzzvil/stella/usersvc/internal/pkg/user"
)

type repo struct {
	*sqlx.DB
}

// New returns a new pgrepo instance.
func New(db *sqlx.DB) user.Repo {
	return &repo{db}
}

func (r *repo) GetUser(id int64) (*user.User, error) {
	u := &user.User{}
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

func (r *repo) GetUsers(ids []int64) ([]*user.User, error) {
	users := []*user.User{}
	q, args, err := sqlx.In("SELECT id, name, slack_user_id, slack_team_id, image FROM users WHERE id IN (?)", ids)
	if err != nil {
		return nil, err
	}
	q = r.DB.Rebind(q)
	rows, err := r.DB.Query(q, args...)
	if err != nil {
		return nil, err
	}
	for rows.Next() {
		u := user.User{}
		if err := rows.Scan(&u.ID, &u.Name, &u.SlackUserID, &u.SlackTeamID, &u.Image); err != nil {
			return nil, err
		}
		users = append(users, &u)
	}

	return users, nil
}

func (r *repo) GetUserBySlackUserID(sid string) (*user.User, error) {
	u := &user.User{}
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

func (r *repo) CreateUser(u *user.User) (*user.User, error) {
	var id int64
	q := `
		INSERT INTO users (name, slack_user_id, slack_team_id, image)
		VALUES ($1, $2, $3, $4)
		RETURNING id`
	if err := r.DB.QueryRow(q, u.Name, u.SlackUserID, u.SlackTeamID, u.Image).Scan(&id); err != nil {
		return nil, fmt.Errorf("failed to create user: %s", err)
	}
	nu := *u
	nu.ID = id
	return &nu, nil
}
