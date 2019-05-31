package auth

// User represents user entity.
type User struct {
	ID          int64
	Name        string
	SlackUserID string
	SlackTeamID string
	Image       string
}
