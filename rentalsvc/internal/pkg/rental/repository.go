package rental

type Repository interface {
	GetResourceStatus(entityID int64) (ResourceStatus, error)
	SetResourceStatus(status ResourceStatus) error
	AddReserveRequest(request ReserveRequest) error
	RemoveReserveRequest(request ReserveRequest) error
}
