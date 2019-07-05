package rental

//Repository interface definition
type Repository interface {
	UpsertRentRequest(request RentRequest) error
	GetLastRentRequestByEntityID(entityID int64) (*RentRequest, error)
	ListRentRequestByUserID(userID int64) ([]*RentRequest, error)

	InsertWatchRequest(request WatchRequest) error
	DeleteWatchRequest(request WatchRequest) error
	ListWatchRequestByEntityID(entityID int64) ([]*WatchRequest, error)
	ListWatchRequestByUserID(userID int64) ([]*WatchRequest, error)
}
