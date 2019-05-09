package rental

type ResourceAvailability int

const (
	Unavailable ResourceAvailability = iota
	Available
)

type ResourceStatus struct {
	ID           uint
	EntityID     int64
	Availability ResourceAvailability
	HolderID     *int64
}

type ReserveRequest struct {
	ID       uint
	UserID   int64
	EntityID int64
}
