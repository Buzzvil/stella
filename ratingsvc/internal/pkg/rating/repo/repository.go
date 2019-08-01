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

	if err := repo.db.Where("entity_id = ?", entityID).Find(&dbRatingList).Error; err != nil {
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

	if err := repo.db.Where("user_id = ?", userID).Find(&dbRatingList).Error; err != nil {
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

func (repo *gormRepo) UpsertRating(r rating.Rating) (*rating.Rating, error) {
	dbr := repo.mapper.RatingToDBRating(r)
	if err := repo.db.Save(&dbr).Error; err != nil {
		return nil, err
	}

	err := repo.recalculateAggrRating(r.EntityID)
	if err != nil {
		return nil, err
	}

	return repo.mapper.dbRatingToRating(*dbr), nil
}

func (repo *gormRepo) DeleteRating(entityID int32, userID int32) error {
	dbr := Rating{EntityID: entityID, UserID: userID}

	if err := repo.db.Where(&dbr).Delete(&dbr).Error; err != nil {
		return err
	}

	return repo.recalculateAggrRating(entityID)
}

func (repo *gormRepo) recalculateAggrRating(entityID int32) error {
	dbrs, err := repo.ListByID(entityID)
	if err != nil {
		return err
	}

	aggr := AggregatedRating{EntityID: entityID}
	var total float32
	cnt := int32(len(dbrs))

	if cnt == 0 {
		if err := repo.db.Delete(&aggr).Error; err != nil {
			return err
		}
		return nil
	}

	for _, dbr := range dbrs {
		total += dbr.Score
	}
	aggr.Score = total / float32(cnt)
	aggr.Count = cnt

	return repo.db.Save(&aggr).Error
}

func New(db *gorm.DB) rating.Repository {
	db.AutoMigrate(&Rating{})
	db.AutoMigrate(&AggregatedRating{})
	return &gormRepo{db, mapper{}}
}
