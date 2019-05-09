package repo

import (
	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating"
)

func GetByID(entityID int32, userID int32) (*rating.Rating, error) {
	panic("kwaaaag")
}

func GetAggregatedRatingByID(entityID int32) (*rating.AggregatedRating, error) {
	panic("kwaaaag")

}

func ListByID(entityID int32) ([]rating.Rating, error) {
	panic("kwaaaag")

}

func ListByUserID(entityID int32, userID int32) ([]rating.Rating, error) {
	panic("kwaaaag")

}

func Upsert(rating rating.Rating) (*rating.Rating, error) {
	panic("kwaaaag")

}

func Delete(entityID int32, userID int32) error {
	panic('kwaaaag')

}
