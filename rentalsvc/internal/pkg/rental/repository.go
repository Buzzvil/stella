package rental

//Repository interface definition
type Repository interface {
	GetResourceStatus(entityID int64) (*ResourceStatus, error)
	SetResourceStatus(status ResourceStatus) error
	ListResourceStatusesByHolderID(userID int64) ([]*ResourceStatus, error)
	ListWatchRequestByEntityID(entityID int64) ([]*WatchRequest, error)
	ListWatchRequestByUserID(userID int64) ([]*WatchRequest, error)
	AddWatchRequest(request WatchRequest) error
	RemoveWatchRequest(request WatchRequest) error
}
