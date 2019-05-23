package ratingsrv

import (
	"context"

	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating"
	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating/repo"

	pb "github.com/Buzzvil/stella/ratingsvc/pkg/proto"
	"github.com/golang/protobuf/ptypes/empty"
)

// Server is interface for grpc server
type app struct {
	db *gorm.DB
	u  rental.Usecase
}

func (a *app) GetRating(context.Context, req *pb.GetRatingRequest) (*pb.GetRatingResponse, error) {
	r, err := a.u.GetRating(req.GetEntityId())
	if err != nil {
		return nil, err
	}
	pbR := pb.GetRatingResponse{
		Score: r.Score,
		Count: r.count,
	}

	return &pbR
}

func (a *app) GetUserRating(context.Context, req *pb.GetUserRatingRequest) (*pb.Rating, error) {
	r, err := a.u.GetUserRating(req.GetEntityId(), req.GetUserId())
	if err != nil {
		return nil, err
	}
	r := pb.Rating{
		EntityId: r.EntityId,
		Score: r.Score,
		UserId: r.UserId,
		Comment: r.Comment
	}

	return &r
}

func (a *app) ListRatings(context.Context, *pb.GetRatingRequest) (*pb.ListRatingsResponse, error) {
	panic("implement me")
}

func (a *app) ListUserRatings(context.Context, *pb.GetUserRatingRequest) (*pb.ListRatingsResponse, error) {
	panic("implement me")
}

func (a *app) UpsertRating(context.Context, *pb.UpsertRatingRequest) (*pb.Rating, error) {
	panic("implement me")
}

func (a *app) Delete(context.Context, *pb.DeleteRequest) (*empty.Empty, error) {
	panic("implement me")
}

// New initializes server
func New() pb.RatingServiceServer {
	db, err := gorm.Open("sqlite3", "rating.db")
	if err != nil {
		panic(err)
	}
	db.LogMode(true)
	ratingRepo := repo.New(db)
	ratingUsecase := rating.NewUsecase(ratingRepo)
	return &app{db, ratingUsecase}
}
