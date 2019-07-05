package repo

import (
	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	"github.com/jinzhu/gorm"
)

type gormRepo struct {
	db *gorm.DB
	mapper
}

func (repo *gormRepo) UpsertRental(request rental.Rental) error {
	dbRequest := repo.mapper.rentalToDBRental(request)
	err := repo.db.Save(dbRequest).Error
	return err
}

func (repo *gormRepo) GetLastRentalByEntityID(entityID int64) (*rental.Rental, error) {
	dbrr := Rental{
		EntityID: entityID,
	}
	err := repo.db.Where(&dbrr).Last(&dbrr).Error
	if err != nil {
		if gorm.IsRecordNotFoundError(err) {
			return nil, nil
		}
		return nil, err
	}
	return repo.mapper.dbRentalToRental(dbrr), nil
}

func (repo *gormRepo) ListRentalByUserID(userID int64) ([]*rental.Rental, error) {
	dbrss := make([]Rental, 0)
	if err := repo.db.Where("user_id = ?", userID).Find(&dbrss).Error; err != nil {
		return nil, err
	}
	rss := make([]*rental.Rental, 0)
	for _, dbrs := range dbrss {
		rss = append(rss, repo.mapper.dbRentalToRental(dbrs))
	}
	return rss, nil
}

func (repo *gormRepo) ListWatchByEntityID(entityID int64) ([]*rental.Watch, error) {
	dbwrs := make([]Watch, 0)
	if err := repo.db.Where("entity_id = ?", entityID).Find(&dbwrs).Error; err != nil {
		return nil, err
	}
	wrs := make([]*rental.Watch, 0)
	for _, dbwr := range dbwrs {
		wrs = append(wrs, repo.mapper.dbWatchToWatch(dbwr))
	}
	return wrs, nil
}

func (repo *gormRepo) ListWatchByUserID(userID int64) ([]*rental.Watch, error) {
	dbwrs := make([]Watch, 0)
	if err := repo.db.Where("user_id = ?", userID).Find(&dbwrs).Error; err != nil {
		return nil, err
	}
	wrs := make([]*rental.Watch, 0)
	for _, dbwr := range dbwrs {
		wrs = append(wrs, repo.mapper.dbWatchToWatch(dbwr))
	}
	return wrs, nil
}

func (repo *gormRepo) InsertWatch(request rental.Watch) error {
	dbRequest := repo.mapper.watchToDBWatch(request)
	err := repo.db.Save(dbRequest).Error
	return err
}

func (repo *gormRepo) DeleteWatch(request rental.Watch) error {
	dbRequest := repo.mapper.watchToDBWatch(request)
	err := repo.db.Where(dbRequest).Delete(dbRequest).Error
	return err
}

//New returns new rental repository
func New(db *gorm.DB) rental.Repository {
	db.AutoMigrate(&Rental{})
	db.AutoMigrate(&Watch{})
	return &gormRepo{db, mapper{}}
}
