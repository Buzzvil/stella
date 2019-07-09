package repo

import (
	"time"
)

// Rental model definition
type Rental struct {
	ID         uint  `gorm:"primary_key"`
	UserID     int64 `gorm:"unique_index"`
	EntityID   int64 `gorm:"unique_index"`
	IsReturned bool
	CreatedAt  time.Time
	UpdatedAt  time.Time
}

// Watch model definition
type Watch struct {
	ID        uint  `gorm:"primary_key"`
	UserID    int64 `gorm:"unique_index:idx_user_entity"`
	EntityID  int64 `gorm:"unique_index:idx_user_entity"`
	CreatedAt time.Time
	UpdatedAt time.Time
}
