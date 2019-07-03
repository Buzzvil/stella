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

func (repo *gormRepo) ListByID(entityID int32) ([]*rating.Rating, error) {
	dbRatingList := make([]Rating, 0)
	ratingList := make([]*rating.Rating, 0)

	if err := repo.db.Where("entityID = ?", entityID).Find(&dbRatingList).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return ratingList, nil
		}
		return nil, err
	}

	for _, dbRating := range dbRatingList {
		ratingList = append(ratingList, repo.mapper.dbRatingToRating(dbRating))
	}
	return ratingList, nil
}

func (repo *gormRepo) ListByUserID(userID int32) ([]*rating.Rating, error) {
	dbRatingList := make([]Rating, 0)
	ratingList := make([]*rating.Rating, 0)

	if err := repo.db.Where("userID = ?", userID).Find(&dbRatingList).Error; err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return ratingList, nil
		}
		return nil, err
	}
	for _, dbRating := range dbRatingList {
		ratingList = append(ratingList, repo.mapper.dbRatingToRating(dbRating))
	}
	return ratingList, nil
}

// TODO: When Upsert rating, AggregatedRating also should be updated.
func (repo *gormRepo) UpsertRating(rating rating.Rating) (*rating.Rating, error) {
	dbRating := repo.mapper.RatingToDBRating(rating)
	if err := repo.db.Where(&dbRating).First(&dbRating).Error; err != nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
		err := repo.db.Create(dbRating).Error
		return repo.mapper.dbRatingToRating(dbRating), err
	}
	err := repo.db.Save(dbRating).Error
	return repo.mapper.dbRatingToRating(dbRating), err
}

func (repo *gormRepo) DeleteRating(entityID int32, userID int32) error {
	dbRating := Rating{EntityID: entityID, UserID: userID}
	return repo.db.Delete(&dbRating).Error
}

func New(db *gorm.DB) rating.Repository {
	db.AutoMigrate(&Rating{})
	db.AutoMigrate(&AggregatedRating{})
	return &gormRepo{db, mapper{}}
}
