package rental

//Repository interface definition
type Repository interface {
	UpsertRental(request Rental) error
	GetLastRentalByEntityID(entityID int64) (*Rental, error)
	ListRentalByUserID(userID int64) ([]*Rental, error)

	InsertWatch(request Watch) error
	DeleteWatch(request Watch) error
	ListWatchByEntityID(entityID int64) ([]*Watch, error)
	ListWatchByUserID(userID int64) ([]*Watch, error)
}
