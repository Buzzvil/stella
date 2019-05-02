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

func (repo *gormRepo) AddReserveRequest(request rental.ReserveRequest) error {
	dbRequest := repo.mapper.reserveRequestToDBReserveRequest(request)
	err := repo.db.Save(&dbRequest).Error
	return err
}

func (repo *gormRepo) RemoveReserveRequest(request rental.ReserveRequest) error {
	dbRequest := repo.mapper.reserveRequestToDBReserveRequest(request)
	err := repo.db.Delete(&dbRequest).Error
	return err
}

func New(db *gorm.DB) rental.Repository {
	db.AutoMigrate(&ResourceStatus{})
	return &gormRepo{db, mapper{}}
}
