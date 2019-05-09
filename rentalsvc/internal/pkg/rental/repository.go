package rental

type Repository interface {
	GetResourceStatus(entityID int64) (*ResourceStatus, error)
	SetResourceStatus(status ResourceStatus) error
	ListReserveRequestByEntityID(entityID int64) ([]*ReserveRequest, error)
	AddReserveRequest(request ReserveRequest) error
	RemoveReserveRequest(request ReserveRequest) error
}
