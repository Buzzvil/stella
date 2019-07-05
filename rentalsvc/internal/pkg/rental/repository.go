package rental

//Repository interface definition
type Repository interface {
	UpsertRental(request Rental) error
	GetLastRentalByEntityID(entityID int64) (*Rental, error)
	ListRentalByUserID(userID int64) ([]*Rental, error)

	InsertWatchRequest(request WatchRequest) error
	DeleteWatchRequest(request WatchRequest) error
	ListWatchRequestByEntityID(entityID int64) ([]*WatchRequest, error)
	ListWatchRequestByUserID(userID int64) ([]*WatchRequest, error)
}
