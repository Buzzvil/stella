package rental

// ResourceAvailability type definition
type ResourceAvailability int

const (
	// Unavailable type definition
	Unavailable ResourceAvailability = iota
	// Available type definition
	Available
)

// UserStatus model definition
type UserStatus struct {
	WatchingEntities []int64
	HoldingEntities  []int64
}

// ResourceStatus model definition
type ResourceStatus struct {
	ID           uint
	EntityID     int64
	Availability ResourceAvailability
	HolderID     *int64
}

// WatchRequest model definition
type WatchRequest struct {
	ID       uint
	UserID   int64
	EntityID int64
}
