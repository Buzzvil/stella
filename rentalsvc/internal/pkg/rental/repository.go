package rental

type Repository interface {
	GetResourceStatus(entityID int64) (*ResourceStatus, error)
	SetResourceStatus(status ResourceStatus) error
	ListWatchRequestByEntityID(entityID int64) ([]*WatchRequest, error)
	AddWatchRequest(request WatchRequest) error
	RemoveWatchRequest(request WatchRequest) error
}
