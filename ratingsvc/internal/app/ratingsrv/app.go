package ratingsrv

import (
	"context"

	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating"
	pb "github.com/Buzzvil/stella/ratingsvc/pkg/proto"
)

// Server is interface for grpc server
type server struct {
}

func (s *server) GetRating(context.Context, r *pb.GetRatingRequest) (*pb.Rating, error) {
	s.u.GetRating(r.entity_id)
	panic("implement me")
}

func (s *server) UpsertRating(context.Context, *pb.UpsertRatingRequest) (*pb.Rating, error) {
	panic("implement me")
}

func (s *server) Delete(context.Context, *pb.DeleteRequest) (*interface{}, error) {
	panic("implement me")
}

// New initializes server
func New() pb.RatingServiceServer {
	u := rating.NewUsecase(nil)
	return &server{u: u}
}
