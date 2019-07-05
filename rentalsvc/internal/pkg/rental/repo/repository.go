package repo

import (
	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	"github.com/jinzhu/gorm"
)

type gormRepo struct {
	db *gorm.DB
	mapper
}

func (repo *gormRepo) UpsertRentRequest(request rental.RentRequest) error {
	dbRequest := repo.mapper.rentRequestToDBRentRequest(request)
	err := repo.db.Save(dbRequest).Error
	return err
}

func (repo *gormRepo) GetLastRentRequestByEntityID(entityID int64) (*rental.RentRequest, error) {
	dbrr := RentRequest{
		EntityID: entityID,
	}
	err := repo.db.Where(&dbrr).Last(&dbrr).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
		return nil, err
	}
	return repo.mapper.dbRentRequestToRentRequest(dbrr), nil
}

func (repo *gormRepo) ListRentRequestByUserID(userID int64) ([]*rental.RentRequest, error) {
	dbrss := make([]RentRequest, 0)
	if err := repo.db.Where("holder_id = ?", userID).Find(&dbrss).Error; err != nil {
		return nil, err
	}
	rss := make([]*rental.RentRequest, 0)
	for _, dbrs := range dbrss {
		rss = append(rss, repo.mapper.dbRentRequestToRentRequest(dbrs))
	}
	return rss, nil
}

func (repo *gormRepo) ListWatchRequestByEntityID(entityID int64) ([]*rental.WatchRequest, error) {
	dbwrs := make([]WatchRequest, 0)
	if err := repo.db.Where("entity_id = ?", entityID).Find(&dbwrs).Error; err != nil {
		return nil, err
	}
	wrs := make([]*rental.WatchRequest, 0)
	for _, dbwr := range dbwrs {
		wrs = append(wrs, repo.mapper.dbWatchRequestToWatchRequest(dbwr))
	}
	return wrs, nil
}

func (repo *gormRepo) ListWatchRequestByUserID(userID int64) ([]*rental.WatchRequest, error) {
	dbwrs := make([]WatchRequest, 0)
	if err := repo.db.Where("user_id = ?", userID).Find(&dbwrs).Error; err != nil {
		return nil, err
	}
	wrs := make([]*rental.WatchRequest, 0)
	for _, dbwr := range dbwrs {
		wrs = append(wrs, repo.mapper.dbWatchRequestToWatchRequest(dbwr))
	}
	return wrs, nil
}

func (repo *gormRepo) InsertWatchRequest(request rental.WatchRequest) error {
	dbRequest := repo.mapper.reserveRequestToDBWatchRequest(request)
	err := repo.db.Save(dbRequest).Error
	return err
}

func (repo *gormRepo) DeleteWatchRequest(request rental.WatchRequest) error {
	dbRequest := repo.mapper.reserveRequestToDBWatchRequest(request)
	err := repo.db.Where(dbRequest).Delete(dbRequest).Error
	return err
}

//New returns new rental repository
func New(db *gorm.DB) rental.Repository {
	db.AutoMigrate(&RentRequest{})
	db.AutoMigrate(&WatchRequest{})
	return &gormRepo{db, mapper{}}
}
