package rental

type ResourceAvailability int

type RequestType string

const (
	Available ResourceAvailability = iota
	Unavailable
)

const (
	RentRequest    RequestType = "request"
	ReturnRequest  RequestType = "return"
	ReserveRequest RequestType = "reserve"
	CancelRequest  RequestType = "cancel"
)

type ResourceRequest struct {
	UserID   int64
	EntityID int64
	Type     RequestType
}
