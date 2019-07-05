package repo

import (
	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
)

type mapper struct{}

func (mapper) dbRentalToRental(dbrr Rental) *rental.Rental {
	return &rental.Rental{
		ID:         dbrr.ID,
		EntityID:   dbrr.EntityID,
		UserID:     dbrr.UserID,
		IsReturned: dbrr.IsReturned,
	}
}

func (mapper) rentalToDBRental(rr rental.Rental) *Rental {
	return &Rental{
		ID:         rr.ID,
		EntityID:   rr.EntityID,
		UserID:     rr.UserID,
		IsReturned: rr.IsReturned,
	}
}

func (mapper) dbWatchToWatch(dbrr Watch) *rental.Watch {
	return &rental.Watch{
		ID:       dbrr.ID,
		EntityID: dbrr.EntityID,
		UserID:   dbrr.UserID,
	}
}

func (mapper) watchToDBWatch(rr rental.Watch) *Watch {
	return &Watch{
		ID:       rr.ID,
		EntityID: rr.EntityID,
		UserID:   rr.UserID,
	}
}
