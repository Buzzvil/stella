package rating

type Repository interface {
	GetByID(entityID int32, userID int32) (*Rating, error)
	GetAggregatedRatingByID(entityID int32) (*AggregatedRating, error)
	ListByID(entityID int32) ([]Rating, error)
	ListByUserID(userID int32) ([]Rating, error)
	UpsertRating(rating Rating) (*Rating, error)
	DeleteRating(entityID int32, userID int32) error
}
