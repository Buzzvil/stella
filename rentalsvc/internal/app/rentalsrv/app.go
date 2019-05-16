package rentalsrv

import (
	"context"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental/repo"
	"github.com/jinzhu/gorm"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	pb "github.com/Buzzvil/stella/rentalsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
	_ "github.com/jinzhu/gorm/dialects/sqlite" // Mysql 사용할 경우 _ "github.com/jinzhu/gorm/dialects/mysql"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Server is interface for grpc app
type app struct {
	db *gorm.DB
	u  rental.Usecase
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
	userIDs, err := a.u.GetResourceWaitingList(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	rs.ReservedUserIds = userIDs
	return &rs, nil
}

func (a *app) RentResource(c context.Context, req *pb.RentResourceRequest) (*empty.Empty, error) {
	err := a.u.RentResource(req.GetUserId(), req.GetEntityId())
	switch err.(type) {
	case rental.InvalidOperationError:
		err = status.Error(codes.Unavailable, "resource is not available")
	}
	return &empty.Empty{}, err
}

func (a *app) ReturnResource(c context.Context, req *pb.ReturnResourceRequest) (*empty.Empty, error) {
	return &empty.Empty{}, a.u.ReturnResource(req.GetUserId(), req.GetEntityId())
}

func (a *app) ReserveResource(c context.Context, req *pb.ReserveResourceRequest) (*empty.Empty, error) {
	err := a.u.ReserveResource(req.GetUserId(), req.GetEntityId())
	switch err.(type) {
	case rental.InvalidOperationError:
		err = status.Error(codes.Unavailable, "resource is already available")
	}
	return &empty.Empty{}, err
}

func (a *app) CancelResource(c context.Context, req *pb.CancelResourceRequest) (*empty.Empty, error) {
	return &empty.Empty{}, a.u.CancelResource(req.GetUserId(), req.GetEntityId())
}

// New initializes app
func New() pb.RentalServiceServer {
	db, err := gorm.Open("sqlite3", "rental.db")
	if err != nil {
		panic(err)
	}
	db.LogMode(true)
	rentalRepo := repo.New(db)
	rentalUsecase := rental.NewUsecase(rentalRepo)
	return &app{db, rentalUsecase}
}
