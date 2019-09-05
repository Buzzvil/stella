package rentalsrv

import (
	"context"
	"log"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	pb "github.com/Buzzvil/stella/rentalsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Server is interface for grpc server
type server struct {
	u rental.Usecase
	n notifier
}

func (s *server) GetResourceStatus(c context.Context, req *pb.GetResourceStatusRequest) (*pb.ResourceStatus, error) {
	rs, err := s.u.GetResourceStatus(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	pbRS := pb.ResourceStatus{EntityId: req.GetEntityId()}
	switch rs.Availability {
	case rental.Available:
		pbRS.Availability = pb.ResourceStatus_AVAILABLE
	case rental.Unavailable:
		pbRS.Availability = pb.ResourceStatus_UNAVAILABLE
	}

	userIDs, err := s.u.ListResourceWatchers(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	if rs.HolderID != nil {
		pbRS.Holder = *rs.HolderID
	}
	pbRS.WatchingUserIds = userIDs
	return &pbRS, nil
}

func (s *server) GetUserStatus(c context.Context, req *pb.GetUserStatusRequest) (*pb.UserStatus, error) {
	us, err := s.u.GetUserStatus(req.GetUserId())
	if err != nil {
		return nil, err
	}
	pbUS := pb.UserStatus{UserId: req.GetUserId(), HeldEntityIds: us.HeldEntities, RentedEntityIds: us.RentedEntities, WatchingEntityIds: us.WatchingEntities}
	return &pbUS, nil
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
	entityID := req.GetEntityId()
	err := s.u.ReturnResource(req.GetUserId(), entityID)
	if err != nil {
		return &empty.Empty{}, err
	}

	userIDs, err := s.u.ListResourceWatchers(entityID)
	for _, userID := range userIDs {
		if err := s.n.sendNotification(userID, entityID); err != nil {
			log.Printf("%s", err)
		}
	}

	return &empty.Empty{}, nil
}

func (s *server) WatchResource(c context.Context, req *pb.WatchResourceRequest) (*empty.Empty, error) {
	err := s.u.WatchResource(req.GetUserId(), req.GetEntityId())
	switch err.(type) {
	case rental.InvalidOperationError:
		err = status.Error(codes.Unavailable, "invalid operation")
	}
	return &empty.Empty{}, err
}

func (s *server) UnwatchResource(c context.Context, req *pb.UnwatchResourceRequest) (*empty.Empty, error) {
	return &empty.Empty{}, s.u.UnwatchResource(req.GetUserId(), req.GetEntityId())
}

// New initializes app
func New(rentalUsecase rental.Usecase) pb.RentalServiceServer {
	return &server{rentalUsecase, newNotifier()}
}
