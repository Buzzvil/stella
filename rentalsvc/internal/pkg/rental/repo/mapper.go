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

func (mapper) dbWatchRequestToWatchRequest(dbrr WatchRequest) *rental.WatchRequest {
	return &rental.WatchRequest{
		ID:       dbrr.ID,
		EntityID: dbrr.EntityID,
		UserID:   dbrr.UserID,
	}
}

func (mapper) watchRequestToDBWatchRequest(rr rental.WatchRequest) *WatchRequest {
	return &WatchRequest{
		ID:       rr.ID,
		EntityID: rr.EntityID,
		UserID:   rr.UserID,
	}
}
