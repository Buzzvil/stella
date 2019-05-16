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

func (repo *gormRepo) ListReserveRequestByEntityID(entityID int64) ([]*rental.ReserveRequest, error) {
	dbrrs := make([]ReserveRequest, 0)
	if err := repo.db.Where("entity_id = ?", entityID).Find(&dbrrs).Error; err != nil {
		return nil, err
	}
	rrs := make([]*rental.ReserveRequest, 0)
	for _, dbrr := range dbrrs {
		rrs = append(rrs, repo.mapper.dbReserveRequestToReserveRequest(dbrr))
	}
	return rrs, nil
}

func (repo *gormRepo) AddReserveRequest(request rental.ReserveRequest) error {
	dbRequest := repo.mapper.reserveRequestToDBReserveRequest(request)
	err := repo.db.Save(dbRequest).Error
	return err
}

func (repo *gormRepo) RemoveReserveRequest(request rental.ReserveRequest) error {
	dbRequest := repo.mapper.reserveRequestToDBReserveRequest(request)
	err := repo.db.Where(dbRequest).Delete(dbRequest).Error
	return err
}

func New(db *gorm.DB) rental.Repository {
	db.AutoMigrate(&ResourceStatus{})
	db.AutoMigrate(&ReserveRequest{})
	return &gormRepo{db, mapper{}}
}
