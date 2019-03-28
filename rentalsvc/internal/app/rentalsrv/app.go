package rentalsrv

import (
	"context"

	pb "github.com/Buzzvil/stella/rentalsvc/pkg/proto"
)

// Server is interface for grpc app
type app struct {
}

func (*app) GetResourceStatus(context.Context, *pb.GetResourceStatusRequest) (*pb.ResourceStatus, error) {
	panic("implement me")
}

func (*app) RentResource(context.Context, *pb.RentResourceRequest) (*pb.ResourceStatus, error) {
	panic("implement me")
}

func (*app) ReturnResource(context.Context, *pb.ReturnResourceRequest) (*pb.ResourceStatus, error) {
	panic("implement me")
}

func (*app) ReserveResource(context.Context, *pb.ReserveResourceRequest) (*pb.ResourceStatus, error) {
	panic("implement me")
}

func (*app) CancelResource(context.Context, *pb.CancelResourceRequest) (*pb.ResourceStatus, error) {
	panic("implement me")
}

// New initializes app
func New() pb.RentalServiceServer {
	return &app{}
}
