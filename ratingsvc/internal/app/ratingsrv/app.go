package ratingsrv

import (
	"context"

	pb "github.com/Buzzvil/stella/ratingsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
)

// Server is interface for grpc server
type server struct {
}

func (s *server) GetRating(context.Context, *pb.GetRatingRequest) (*pb.Rating, error) {
	panic("implement me")
}

func (s *server) UpsertRating(context.Context, *pb.UpsertRatingRequest) (*pb.Rating, error) {
	panic("implement me")
}

func (s *server) Delete(context.Context, *pb.DeleteRequest) (*empty.Empty, error) {
	panic("implement me")
}

// New initializes server
func New() pb.RatingServiceServer {
	return &server{}
}
