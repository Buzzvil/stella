package rentalsrv

import (
	"context"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	pb "github.com/Buzzvil/stella/rentalsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Server is interface for grpc server
type server struct {
	u rental.Usecase
}

func (s *server) GetResourceStatus(c context.Context, req *pb.GetResourceStatusRequest) (*pb.ResourceStatus, error) {
	rs, err := s.u.GetResourceStatus(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	pbRs := pb.ResourceStatus{EntityId: req.GetEntityId()}
	switch rs.Availability {
	case rental.Available:
		pbRs.Availability = pb.ResourceStatus_AVAILABLE
	case rental.Unavailable:
		pbRs.Availability = pb.ResourceStatus_UNAVAILABLE
	}

	userIDs, err := s.u.GetResourceWaitingList(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	if rs.HolderID != nil {
		pbRs.Holder = *rs.HolderID
	}
	pbRs.ReservedUserIds = userIDs
	return &pbRs, nil
}

func (s *server) RentResource(c context.Context, req *pb.RentResourceRequest) (*empty.Empty, error) {
	err := s.u.RentResource(req.GetUserId(), req.GetEntityId())
	switch err.(type) {
	case rental.InvalidOperationError:
		err = status.Error(codes.Unavailable, "invalid operation")
	}
	return &empty.Empty{}, err
}

func (s *server) ReturnResource(c context.Context, req *pb.ReturnResourceRequest) (*empty.Empty, error) {
	return &empty.Empty{}, s.u.ReturnResource(req.GetUserId(), req.GetEntityId())
}

func (s *server) ReserveResource(c context.Context, req *pb.ReserveResourceRequest) (*empty.Empty, error) {
	err := s.u.ReserveResource(req.GetUserId(), req.GetEntityId())
	switch err.(type) {
	case rental.InvalidOperationError:
		err = status.Error(codes.Unavailable, "invalid operation")
	}
	return &empty.Empty{}, err
}

func (s *server) CancelResource(c context.Context, req *pb.CancelResourceRequest) (*empty.Empty, error) {
	return &empty.Empty{}, s.u.CancelResource(req.GetUserId(), req.GetEntityId())
}

// New initializes app
func New(rentalUsecase rental.Usecase) pb.RentalServiceServer {
	return &server{rentalUsecase}
}
