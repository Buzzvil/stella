package ratingsrv

import (
	"context"

	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating"
	pb "github.com/Buzzvil/stella/ratingsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"
)

// Server is interface for grpc server
type server struct {
	u  rating.Usecase
}

func (s *server) GetRating(context.Context, req *pb.GetRatingRequest) (*pb.GetRatingResponse, error) {
	r, err := s.u.GetRating(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	pbRr := pb.GetRatingResponse{
		Score: r.Score,
		Count: r.count,
	}

	return &pbRr
}

func (s *server) GetUserRating(context.Context, req *pb.GetUserRatingRequest) (*pb.Rating, error) {
	r, err := s.u.GetUserRating(req.GetEntityId(), req.GetUserId())
	if err != nil {
		return nil, err
	}
	pbR := pb.Rating{
		EntityId: r.EntityId,
		Score: r.Score,
		UserId: r.UserId,
		Comment: r.Comment
	}

	return &pbR
}

func (s *server) ListRatings(context.Context, *pb.GetRatingRequest) (*pb.ListRatingsResponse, error) {
	rs, err := s.u.ListRatings(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	
	pbRs := pb.ListRatingsResponse{
		Ratings: rs
	}

	return &pbRs
}

func (s *server) ListUserRatings(context.Context, *pb.GetUserRatingRequest) (*pb.ListRatingsResponse, error) {
	rs, err := s.u.ListUserRatings(req.GetUserId())
	if err != nil {
		return nil, err
	}
	
	pbRs := pb.ListRatingsResponse{
		Ratings: rs
	}

	return &pbRs
}

func (s *server) UpsertRating(context.Context, *pb.UpsertRatingRequest) (*pb.Rating, error) {
    r, err := s.u.UpsertRating(Rating{
		req.GetUserId(),
		req.GetEntityId(),
		req.GetScore(),
		req.GetComment()
	})
	if err != nil {
		return nil, err
	}
	pbR := pb.Rating{
		EntityId: r.EntityId,
		Score: r.Score,
		UserId: r.UserId,
		Comment: r.Comment
	}

	return &pbR
}

func (s *server) DeleteRating(context.Context, *pb.DeleteRequest) (*empty.Empty, error) {
	err := s.u.DeleteRating(req.GetUserId(), req.GetEntityId())
	switch err.(type) {
	case rating.InvalidOperationError:
		err = status.Error(codes.Unavailable, "invalid operation")
	}
	return &empty.Empty{}, err
	return &empty.Empty{}, s.u.DeleteRating(req.GetUserId(), req.GetEntityId())
}

// New initializes server
func New(ratingUsecase rating.Usecase) pb.RatingServiceServer {
	return &server{ratingUsecase}
}
