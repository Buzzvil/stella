package rental

type ResourceAvailability int

const (
	Unavailable ResourceAvailability = iota
	Available
)

type ResourceStatus struct {
	EntityID     int64
	Availability ResourceAvailability
	HolderID     *int64
}

type ReserveRequest struct {
	UserID   int64
	EntityID int64
}
