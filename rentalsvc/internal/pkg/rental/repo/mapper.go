package repo

import (
	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
)

type mapper struct{}

func (mapper) dbRentRequestToRentRequest(dbrr RentRequest) *rental.RentRequest {
	return &rental.RentRequest{
		ID:         dbrr.ID,
		EntityID:   dbrr.EntityID,
		UserID:     dbrr.UserID,
		IsReturned: dbrr.IsReturned,
	}
}

func (mapper) rentRequestToDBRentRequest(rr rental.RentRequest) *RentRequest {
	return &RentRequest{
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
