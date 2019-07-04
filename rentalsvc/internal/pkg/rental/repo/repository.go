package repo

import (
	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	"github.com/jinzhu/gorm"
)

type gormRepo struct {
	db *gorm.DB
	mapper
}

func (repo *gormRepo) GetResourceStatus(entityID int64) (*rental.ResourceStatus, error) {
	dbStatus := ResourceStatus{EntityID: entityID}
	if err := repo.db.Where(&dbStatus).First(&dbStatus).Error; err != nil {
		if err != gorm.ErrRecordNotFound {
			return nil, err
		}
		status := rental.ResourceStatus{
			EntityID:     entityID,
			Availability: rental.Available,
		}
		return &status, nil
	}
	return repo.mapper.dbResourceStatusToResourceStatus(dbStatus), nil
}

func (repo *gormRepo) SetResourceStatus(status rental.ResourceStatus) error {
	dbStatus := repo.resourceStatusToDBResourceStatus(status)
	err := repo.db.Save(dbStatus).Error
	return err
}

func (repo *gormRepo) ListResourceStatusesByHolderID(userID int64) ([]*rental.ResourceStatus, error) {
	dbrss := make([]ResourceStatus, 0)
	if err := repo.db.Where("holder_id = ?", userID).Find(&dbrss).Error; err != nil {
		return nil, err
	}
	rss := make([]*rental.ResourceStatus, 0)
	for _, dbrs := range dbrss {
		rss = append(rss, repo.mapper.dbResourceStatusToResourceStatus(dbrs))
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

func (repo *gormRepo) AddWatchRequest(request rental.WatchRequest) error {
	dbRequest := repo.mapper.reserveRequestToDBWatchRequest(request)
	err := repo.db.Save(dbRequest).Error
	return err
}

func (repo *gormRepo) RemoveWatchRequest(request rental.WatchRequest) error {
	dbRequest := repo.mapper.reserveRequestToDBWatchRequest(request)
	err := repo.db.Where(dbRequest).Delete(dbRequest).Error
	return err
}

//New returns new rental repository
func New(db *gorm.DB) rental.Repository {
	db.AutoMigrate(&ResourceStatus{})
	db.AutoMigrate(&WatchRequest{})
	return &gormRepo{db, mapper{}}
}
