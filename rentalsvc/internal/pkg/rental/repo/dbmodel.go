package repo

import (
	"time"
)

// RentRequest model definition
type RentRequest struct {
	ID         uint  `gorm:"primary_key"`
	UserID     int64 `gorm:"unique_index"`
	EntityID   int64 `gorm:"unique_index"`
	IsReturned bool
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

// WatchRequest model definition
type WatchRequest struct {
	ID        uint  `gorm:"primary_key"`
	UserID    int64 `gorm:"unique_index:idx_user_entity"`
	EntityID  int64 `gorm:"unique_index:idx_user_entity"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
