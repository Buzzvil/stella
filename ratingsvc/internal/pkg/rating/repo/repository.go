package repo

import (
	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating"
	"github.com/jinzhu/gorm"
)

type gormRepo struct {
	db *gorm.DB
	mapper
}

func (repo *gormRepo) GetByID(entityID int32, userID int32) (*rating.Rating, error) {
	dbRating := Rating{EntityID: entityID, UserID: userID}
	err := repo.db.Where(&dbRating).First(&dbRating).Error
	if err != nil {
		return nil, err
	}
	return repo.mapper.dbRatingToRating(dbRating), nil
}

func (repo *gormRepo) GetAggregatedRatingByID(entityID int32) (*rating.AggregatedRating, error) {
	dbAggregatedRating := AggregatedRating{EntityID: entityID}
	err := repo.db.Where(&dbAggregatedRating).First(&dbAggregatedRating).Error
	if err != nil {
		return nil, err
	}
	return repo.mapper.dbAggregatedRatingToAggregatedRating(dbAggregatedRating), nil
}

func (repo *gormRepo) ListByID(entityID int32) ([]rating.Rating, error) {
	dbRatingList := Rating{EntityID: entityID}
	err := repo.db.Where(&dbRatingList).Error
	if err != nil {
		return nil, err
	}

	ratingList = []
	for dbRating in dbRatingList {
		RatingList.append(repo.mapper.dbRatingToRating(dbRating))
	}

	return ratingList, nil
}

func (repo *gormRepo) ListByUserID(userID int32) ([]rating.Rating, error) {
	dbRatingList := Rating{UserID: userID}
	err := repo.db.Where(&dbRatingList).Error
	if err != nil {
		return nil, err
	}

	ratingList = []
	for dbRating in dbRatingList {
		RatingList.append(repo.mapper.dbRatingToRating(dbRating))
	}

	return ratingList, nil
}

func UpsertRating(rating rating.Rating) (*rating.Rating, error) {
	panic("kwaaaag")

}

func DeleteRating(rating rating.Rating) error {
	dbRating := repo.mapper.reserveRatingToDBRating(rating)
	err := repo.db.Delete(&dbRequest).Error
	return err
}
