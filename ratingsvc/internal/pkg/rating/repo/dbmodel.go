package repo

import (
	"time"
)

type Rating struct {
	ID        uint  `gorm:"primary_key"`
	EntityID  int32 `gorm:"unique_index:idx_entity_user"`
	Score     float32
	UserID    int32 `gorm:"unique_index:idx_entity_user"`
	Comment   string
	CreatedAt time.Time
	UpdatedAt time.Time
}

type AggregatedRating struct {
	ID        uint  `gorm:"primary_key"`
	EntityID  int32 `gorm:"index;unique"`
	Score     float32
	Count     int32
	CreatedAt time.Time
	UpdatedAt time.Time
}
