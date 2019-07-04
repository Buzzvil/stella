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
	u rating.Usecase
}

func (s *server) GetRating(c context.Context, req *pb.GetRatingRequest) (*pb.GetRatingResponse, error) {
	r, err := s.u.GetRating(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	pbRr := pb.GetRatingResponse{
		Score: r.Score,
		Count: r.Count,
	}

	return &pbRr, nil
}

func (s *server) GetUserRating(c context.Context, req *pb.GetUserRatingRequest) (*pb.Rating, error) {
	r, err := s.u.GetUserRating(req.GetEntityId(), req.GetUserId())
	if err != nil {
		return nil, err
	}
	pbR := pb.Rating{
		EntityId: r.EntityID,
		Score:    r.Score,
		UserId:   r.UserID,
		Comment:  r.Comment,
	}

	return &pbR, nil
}

func (s *server) ListRatings(c context.Context, req *pb.GetRatingRequest) (*pb.ListRatingsResponse, error) {
	rs, err := s.u.ListRatings(req.GetEntityId())
	if err != nil {
		return nil, err
	}

	ratings := []*pb.Rating{}
	for _, r := range rs {
		ratings = append(ratings, &pb.Rating{
			EntityId: r.EntityID,
			UserId:   r.UserID,
			Score:    r.Score,
			Comment:  r.Comment,
		})
	}

	return &pb.ListRatingsResponse{Ratings: ratings}, nil
}

func (s *server) ListUserRatings(c context.Context, req *pb.GetUserRatingRequest) (*pb.ListRatingsResponse, error) {
	rs, err := s.u.ListUserRatings(req.GetUserId())
	if err != nil {
		return nil, err
	}

	ratings := []*pb.Rating{}
	for _, r := range rs {
		ratings = append(ratings, &pb.Rating{
			EntityId: r.EntityID,
			UserId:   r.UserID,
			Score:    r.Score,
			Comment:  r.Comment,
		})
	}

	return &pb.ListRatingsResponse{Ratings: ratings}, nil
}

func (s *server) UpsertRating(c context.Context, req *pb.UpsertRatingRequest) (*pb.Rating, error) {
	r, err := s.u.UpsertRating(rating.Rating{
		req.GetEntityId(),
		req.GetScore(),
		req.GetUserId(),
		req.GetComment(),
	})
	if err != nil {
		return nil, err
	}
	pbR := pb.Rating{
		EntityId: r.EntityID,
		Score:    r.Score,
		UserId:   r.UserID,
		Comment:  r.Comment,
	}

	return &pbR, nil
}

func (s *server) DeleteRating(c context.Context, req *pb.DeleteRequest) (*empty.Empty, error) {
	err := s.u.DeleteRating(req.GetUserId(), req.GetEntityId())
	switch err.(type) {
	case rating.InvalidOperationError:
		err = status.Error(codes.Unavailable, "invalid operation")
	}
	return &empty.Empty{}, err
}

// New initializes server
func New(ratingUsecase rating.Usecase) pb.RatingServiceServer {
	return &server{ratingUsecase}
}
