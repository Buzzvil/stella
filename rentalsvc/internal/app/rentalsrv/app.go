package rentalsrv

import (
	"context"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	pb "github.com/Buzzvil/stella/rentalsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
)

// Server is interface for grpc app
type app struct {
	u rental.Usecase
}

func (a *app) GetResourceStatus(c context.Context, req *pb.GetResourceStatusRequest) (*pb.ResourceStatus, error) {
	avail, err := a.u.GetResourceAvailability(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	rs := pb.ResourceStatus{EntityId: req.GetEntityId()}
	switch avail {
	case rental.Available:
		rs.Availability = pb.ResourceStatus_AVAILABLE
	case rental.Unavailable:
		rs.Availability = pb.ResourceStatus_UNAVAILABLE
	}
	//TODO: rs.GetReservedUserIds
	return &rs, nil
}

func (a *app) RentResource(context.Context, *pb.RentResourceRequest) (*empty.Empty, error) {
	panic("implement me")
}

func (a *app) ReturnResource(context.Context, *pb.ReturnResourceRequest) (*empty.Empty, error) {
	panic("implement me")
}

func (a *app) ReserveResource(context.Context, *pb.ReserveResourceRequest) (*empty.Empty, error) {
	panic("implement me")
}

func (a *app) CancelResource(context.Context, *pb.CancelResourceRequest) (*empty.Empty, error) {
	panic("implement me")
}

// New initializes app
func New() pb.RentalServiceServer {
	return &app{}
}
