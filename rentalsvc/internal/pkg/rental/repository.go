package rental

type Repository interface {
	Get(entityID int64)
}
