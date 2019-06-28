package usersrv

import (
	"context"
	"strconv"

	"google.golang.org/grpc/codes"
	"google.golang.org/grpc/status"

	"google.golang.org/grpc/metadata"

	"github.com/Buzzvil/stella/usersvc/internal/pkg/user"
	pb "github.com/Buzzvil/stella/usersvc/pkg/proto"
)

// Server is interface for grpc server
type server struct {
	u user.Usecase
}

// New initializes server
func New(u user.Usecase) pb.UserServiceServer {
	return &server{u: u}
}

func userToPBUser(u *user.User) *pb.User {
	return &pb.User{
		Id:          u.ID,
		Name:        u.Name,
		SlackUserId: u.SlackUserID,
		SlackTeamId: u.SlackTeamID,
		Image:       u.Image,
	}
}

func (s *server) ListUsers(c context.Context, r *pb.ListUsersRequest) (*pb.ListUsersResponse, error) {
	users, err := s.u.GetUsers(r.Ids)
	if err != nil {
		return nil, status.Error(codes.Internal, "failed to fetch users")
	}
	userList := []*pb.User{}
	for _, user := range users {
		userList = append(userList, userToPBUser(user))
	}
	return &pb.ListUsersResponse{Users: userList}, nil
}

func (s *server) GetUser(c context.Context, r *pb.GetUserRequest) (*pb.User, error) {
	var u *user.User
	var err error
	switch r.Identifier.(type) {
	case *pb.GetUserRequest_Id:
		u, err = s.u.GetUser(r.GetId())
	case *pb.GetUserRequest_SlackUserId:
		u, err = s.u.GetUserBySlackUserID(r.GetSlackUserId())
	default:
		return nil, status.Error(codes.InvalidArgument, "identifier not provided.")
	}
	if err != nil {
		return nil, err
	}

	if u == nil {
		return nil, status.Error(codes.NotFound, "user not found")
	}
	return userToPBUser(u), nil
}

func (s *server) GetCurrentUser(c context.Context, _ *pb.GetCurrentUserRequest) (*pb.User, error) {
	var u *user.User
	var err error
	md, _ := metadata.FromIncomingContext(c)
	uids := md.Get("user-id")
	if len(uids) < 1 {
		return nil, status.Error(codes.Unauthenticated, "unauthenticated")
	}
	id, err := strconv.ParseInt(uids[0], 10, 64)
	if err != nil {
		return nil, status.Error(codes.InvalidArgument, "failed to parse user-id")
	}
	u, err = s.u.GetUser(id)
	if err != nil {
		return nil, status.Error(codes.Internal, "failed to fetch user")
	}

	if u == nil {
		return nil, status.Error(codes.NotFound, "user not found")
	}
	return userToPBUser(u), nil
}

func (s *server) CreateUser(c context.Context, r *pb.CreateUserRequest) (*pb.User, error) {
	user := user.User{
		Name:        r.Name,
		SlackUserID: r.SlackUserId,
		SlackTeamID: r.SlackTeamId,
		Image:       r.Image,
	}
	u, err := s.u.CreateUser(&user)
	if err != nil {
		return nil, status.Error(codes.FailedPrecondition, "failed to create user")
	}
	return userToPBUser(u), nil
}
