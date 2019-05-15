package auth

// User represents user entity.
type User struct {
	ID          int
	Name        string
	SlackUserID string
	SlackTeamID string
	Image       string
}

// SlackUser represents slack user profile.
type SlackUser struct {
	ID     string
	TeamID string
	Name   string
	Image  string
}
