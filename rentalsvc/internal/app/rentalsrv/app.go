package rentalsrv

import (
	"context"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	pb "github.com/Buzzvil/stella/rentalsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
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

func (a *app) RentResource(c context.Context, req *pb.RentResourceRequest) (*empty.Empty, error) {
	avail, err := a.u.GetResourceAvailability(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	if avail != rental.Available {
		err := status.Error(codes.Unavailable, "resource is not available")
		return nil, err
	}
	err = a.u.RentResource(req.GetUserId(), req.GetEntityId())
	return nil, err
}

func (a *app) ReturnResource(c context.Context, req *pb.ReturnResourceRequest) (*empty.Empty, error) {
	avail, err := a.u.GetResourceAvailability(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	if avail == rental.Available {
		err := status.Error(codes.Unavailable, "resource is already available")
		return nil, err
	}
	err = a.u.ReturnResource(req.GetUserId(), req.GetEntityId())
	return nil, err
}

func (a *app) ReserveResource(c context.Context, req *pb.ReserveResourceRequest) (*empty.Empty, error) {
	avail, err := a.u.GetResourceAvailability(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	if avail == rental.Available {
		err := status.Error(codes.Unavailable, "resource is already available")
		return nil, err
	}
	err = a.u.ReserveResource(req.GetUserId(), req.GetEntityId())
	return nil, err
}

func (a *app) CancelResource(c context.Context, req *pb.CancelResourceRequest) (*empty.Empty, error) {
	err := a.u.CancelResource(req.GetUserId(), req.GetEntityId())
	return nil, err
}

// New initializes app
func New() pb.RentalServiceServer {
	return &app{}
}
