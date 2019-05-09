package rental

type ResourceAvailability int

const (
	Available ResourceAvailability = iota
	Unavailable
)

type ResourceStatus struct {
	EntityID      int64
	Availablility ResourceAvailability
	Holder        *int64
}

type ReserveRequest struct {
	UserID   int64
	EntityID int64
}
