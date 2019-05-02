package repo

import "github.com/jinzhu/gorm"

type ResourceStatus struct {
	EntityID     int64 `gorm:"index;unique"`
	Availability int
	HolderID     *int64
	gorm.Model
}

type ReserveRequest struct {
	UserID   int64 `gorm:"unique_index:idx_user_entity"`
	EntityID int64 `gorm:"unique_index:idx_user_entity"`
	gorm.Model
}
