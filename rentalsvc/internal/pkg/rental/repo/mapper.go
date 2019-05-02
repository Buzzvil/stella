package repo

import (
	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
)

type mapper struct{}

func (mapper) dbResourceStatusToResourceStatus(dbrs ResourceStatus) *rental.ResourceStatus {
	return &rental.ResourceStatus{
		EntityID:     dbrs.EntityID,
		Availability: rental.ResourceAvailability(dbrs.Availability),
		HolderID:     dbrs.HolderID,
	}
}

func (mapper) resourceStatusToDBResourceStatus(rs rental.ResourceStatus) *ResourceStatus {
	return &ResourceStatus{
		EntityID:     rs.EntityID,
		Availability: int(rs.Availability),
		HolderID:     rs.HolderID,
	}
}

func (mapper) dbReserveRequestToReserveReques(dbrr ReserveRequest) *rental.ReserveRequest {
	return &rental.ReserveRequest{
		EntityID: dbrr.EntityID,
		UserID:   dbrr.UserID,
	}
}

func (mapper) reserveRequestToDBReserveRequest(rr rental.ReserveRequest) *ReserveRequest {
	return &ReserveRequest{
		EntityID: rr.EntityID,
		UserID:   rr.UserID,
	}
}
