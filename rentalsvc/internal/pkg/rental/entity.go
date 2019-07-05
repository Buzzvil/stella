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
	RentedEntities   []int64
}

// ResourceStatus model definition
type ResourceStatus struct {
	EntityID     int64
	Availability ResourceAvailability
	HolderID     *int64
}

// Rental model definition
type Rental struct {
	ID         uint
	UserID     int64
	EntityID   int64
	IsReturned bool
}

// Watch model definition
type Watch struct {
	ID       uint
	UserID   int64
	EntityID int64
}
