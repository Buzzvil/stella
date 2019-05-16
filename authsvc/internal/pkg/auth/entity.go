package auth

// User represents user entity.
type User struct {
	ID          int
	Name        string
	SlackUserID string
	SlackTeamID string
	Image       string
}
