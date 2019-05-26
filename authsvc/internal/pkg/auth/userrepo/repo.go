package pgrepo

import (
	"context"
	"fmt"
	"log"

	_ "github.com/lib/pq"
	"google.golang.org/grpc"

	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	pb "github.com/Buzzvil/stella/usersvc/pkg/proto"
)

type repo struct {
	client pb.UserServiceClient
}

// New returns a new pgrepo instance.
func New(addr string) auth.UserRepo {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	conn, err := grpc.Dial(addr, opts...)
	if err != nil {
		log.Fatalf("failed to dial usersvc: %s", err)
	}
	defer conn.Close()
	client := pb.NewUserServiceClient(conn)
	return &repo{client}
}

func (r *repo) GetUserByID(id int64) (*auth.User, error) {
	req := pb.GetUserRequest{Identifier: &pb.GetUserRequest_Id{Id: id}}
	u, err := r.client.GetUser(context.Background(), &req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user: %s", err)
	}
	return &auth.User{ID: u.Id}, nil
}

func (r *repo) GetUserBySlackUserID(sid string) (*auth.User, error) {
	req := pb.GetUserRequest{Identifier: &pb.GetUserRequest_SlackUserId{SlackUserId: sid}}
	u, err := r.client.GetUser(context.Background(), &req)
	if err != nil {
		return nil, fmt.Errorf("failed to fetch user: %s", err)
	}
	return &auth.User{ID: u.Id}, nil
}

func (r *repo) CreateUser(u *auth.User) (*auth.User, error) {
	req := pb.CreateUserRequest{
		Name:        u.Name,
		SlackUserId: u.SlackUserID,
		SlackTeamId: u.SlackTeamID,
		Image:       u.Image,
	}
	nu, err := r.client.CreateUser(context.Background(), &req)

	return &auth.User{
		ID:          nu.GetId(),
		Name:        nu.GetName(),
		SlackUserID: nu.GetSlackUserId(),
		SlackTeamID: nu.GetSlackTeamId(),
		Image:       nu.GetImage(),
	}, nil
}
