package repo

import (
	"time"
)

type ResourceStatus struct {
	ID           uint  `gorm:"primary_key"`
	EntityID     int64 `gorm:"index;unique"`
	Availability int
	HolderID     *int64
	CreatedAt    time.Time
	UpdatedAt    time.Time
}

type ReserveRequest struct {
	ID        uint  `gorm:"primary_key"`
	UserID    int64 `gorm:"unique_index:idx_user_entity"`
	EntityID  int64 `gorm:"unique_index:idx_user_entity"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
