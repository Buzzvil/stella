package rating

type Repository interface {
	GetByID(entityID int32, userID int32) (*Rating, error)
	GetAggregatedRatingByID(entityID int32) (*AggregatedRating, error)
	ListByID(entityID int32) ([]Rating, error)
	ListByUserID(entityID int32, userID int32) ([]Rating, error)
	Upsert(rating Rating) (*Rating, error)
	Delete(entityID int32, userID int32) error
}
