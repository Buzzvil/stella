CREATE TABLE users (
    id serial PRIMARY KEY UNIQUE NOT NULL,
    name varchar(50),
    slack_user_id varchar(50),
    slack_team_id varchar(50),
    image varchar(512),
    created_at timestamp NOT NULL DEFAULT NOW()
);

CREATE UNIQUE INDEX idx_users_slack_user_id_slack_team_id ON users (slack_user_id, slack_team_id);

