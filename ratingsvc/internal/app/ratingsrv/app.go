package ratingsrv

import (
	"context"

	pb "github.com/Buzzvil/stella/ratingsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
)

// Server is interface for grpc server
type server struct {
}

func (s *server) GetRating(context.Context, *pb.GetRatingRequest) (*pb.GetRatingResponse, error) {
	panic("implement me")
}

func (s *server) GetUserRating(context.Context, *pb.GetUserRatingRequest) (*pb.Rating, error) {
	panic("implement me")
}

func (s *server) ListRatings(context.Context, *pb.GetRatingRequest) (*pb.ListRatingsResponse, error) {
	panic("implement me")
}

func (s *server) ListUserRatings(context.Context, *pb.GetUserRatingRequest) (*pb.ListRatingsResponse, error) {
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
