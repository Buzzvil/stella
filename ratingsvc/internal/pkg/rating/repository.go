package rating

type Repository interface {
	GetByID(entityID int32, userID int32) (*Rating, error)
	GetAverageByID(entityID int32) (float32, error)
	GetCountByID(entityID int32) (int, error)
	ListByID(entityID int32) ([]Rating, error)
	ListByUserID(entityID int32, userID int32) ([]Rating, error)
	Upsert(rating Rating) (*Rating, error)
	Delete(entityID int32, userID int32) error
}
