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

// TODO: When Upsert rating, AggregatedRating also should be updated.
func (repo *gormRepo) UpsertRating(rating rating.Rating) (*rating.Rating, error) {

	dbRating := Rating{EntityID: rating.EntityID, UserID: rating.UserID}
	newDBRating := repo.mapper.RatingToDBRating(rating)

	dbAggregaterating := AggregatedRating{EntityID: rating.EntityID}
	newDBaggregaterating := AggregatedRating{EntityID: rating.EntityID, Score: rating.Score, Count: 1}

	err := repo.db.Where(&dbRating).First(&dbRating).Error
	if err != nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}

		err := repo.db.Create(&newDBRating).Error

		if err := repo.db.Where(&dbAggregaterating).First(&dbAggregaterating).Error; err != nil {
			if err != gorm.ErrRecordNotFound {
				return nil, err
			}
			err := repo.db.Create(&newDBaggregaterating).Error
			if err != nil {
				return nil, err
			}
		} else {
			currentAverage := dbAggregaterating.Score
			currentCount := dbAggregaterating.Count
			repo.db.First(&dbAggregaterating).Updates(AggregatedRating{
				Score: (currentAverage*float32(currentCount) + rating.Score) / float32(currentCount+1),
				Count: currentCount + 1,
			})
		}

		return &rating, err
	}
	err = repo.db.Where(&dbAggregaterating).First(&dbAggregaterating).Error
	if err != nil {
		return nil, err
	}
	currentAverage := dbAggregaterating.Score
	currentCount := dbAggregaterating.Count
	currentScore := dbRating.Score
	newRating := *newDBRating
	newScore := newRating.Score

	repo.db.First(&dbAggregaterating).Updates(AggregatedRating{
		Score: (currentAverage*float32(currentCount) - currentScore + newScore) / float32(currentCount),
	})

	err = repo.db.First(&dbRating).Updates(&newDBRating).Error

	return &rating, err
}

func (repo *gormRepo) DeleteRating(entityID int32, userID int32) error {
	dbRating := Rating{EntityID: entityID, UserID: userID}
	dbAggregaterating := AggregatedRating{EntityID: entityID}

	if err := repo.db.Where(&dbAggregaterating).First(&dbAggregaterating).Error; err != nil {
		return err
	} else {
		if dbAggregaterating.Count == 1 {
			err := repo.db.Delete(&dbAggregaterating).Error
			if err != nil {
				return err
			}
		} else {
			repo.db.Where(&dbRating).First(&dbRating)
			currentAverage := dbAggregaterating.Score
			currentCount := dbAggregaterating.Count
			currentScore := dbRating.Score
			repo.db.First(&dbAggregaterating).Updates(AggregatedRating{
				Score: (currentAverage*float32(currentCount) - currentScore) / float32(currentCount-1),
				Count: currentCount - 1,
			})
		}
	}

	return repo.db.Where(&dbRating).Delete(&dbRating).Error
}

func New(db *gorm.DB) rating.Repository {
	db.AutoMigrate(&Rating{})
	db.AutoMigrate(&AggregatedRating{})
	return &gormRepo{db, mapper{}}
}
