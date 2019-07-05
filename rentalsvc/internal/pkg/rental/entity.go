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
	EntityID     int64
	Availability ResourceAvailability
	HolderID     *int64
}

// RentRequest model definition
type RentRequest struct {
	ID         uint
	UserID     int64
	EntityID   int64
	IsReturned bool
}

// WatchRequest model definition
type WatchRequest struct {
	ID       uint
	UserID   int64
	EntityID int64
}
