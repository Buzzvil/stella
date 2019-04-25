package repo

import "github.com/jinzhu/gorm"

type ResourceStatus struct {
	EntityID int64 `gorm:"index"`
	gorm.Model
}

type ResourceRequest struct {
	UserID   int64  `gorm:"index"`
	EntityID int64  `gorm:"index"`
	Type     string `gorm:"type:varchar(4)"`
	gorm.Model
}
