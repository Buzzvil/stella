package ratingsrv

import (
	"context"

	pb "github.com/Buzzvil/stella/ratingsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
)

// Server is interface for grpc server
type server struct {
}

func (s *server) GetRating(c context.Context, r *pb.GetRatingRequest) (*pb.Rating, error) {
	rating, err := s.u.GetRating(r.entity_id)
	if err != nil {
		return nil, err
	}
	return rating, nil
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
