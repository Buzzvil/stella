package main

import (
	"log"
	"net"
	"os"

	"github.com/Buzzvil/stella/authsvc/internal/app/authsrv"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth"
	"github.com/Buzzvil/stella/authsvc/internal/pkg/auth/userrepo"
	pb "github.com/Buzzvil/stella/usersvc/pkg/proto"

	ev "github.com/envoyproxy/go-control-plane/envoy/service/auth/v2"
	grpc_middleware "github.com/grpc-ecosystem/go-grpc-middleware"
	grpc_logrus "github.com/grpc-ecosystem/go-grpc-middleware/logging/logrus"
	grpc_ctxtags "github.com/grpc-ecosystem/go-grpc-middleware/tags"
	_ "github.com/lib/pq"
	"github.com/sirupsen/logrus"
	"google.golang.org/grpc"
)

var jwtSigningKey = []byte(os.Getenv("JWT_SIGNING_KEY"))

func main() {
	opts := []grpc.DialOption{grpc.WithInsecure()}
	conn, err := grpc.Dial(os.Getenv("USERSVC_ADDR"), opts...)
	if err != nil {
		log.Fatalf("failed to dial usersvc: %s", err)
	}
	defer conn.Close()
	client := pb.NewUserServiceClient(conn)

	r := userrepo.New(client)
	u := auth.NewUsecase(r, nil)
	c := authsrv.Config{
		JWTSigningKey: jwtSigningKey,
		Usecase:       u,
	}
	srv := authsrv.New(c)

	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	grpcServer := newGrpcServer()

	ev.RegisterAuthorizationServer(grpcServer, srv)

	lis, err := net.Listen("tcp", ":9000")
	if err != nil {
		log.Fatalf("Failed to listen: %v", err)
	}

	if err := grpcServer.Serve(lis); err != nil {
		log.Fatalf("Failed to serve: %v", err)
	}
	return
}

func newGrpcServer() *grpc.Server {
	logrusEntry := logrus.NewEntry(logrus.StandardLogger())
	opts := []grpc_logrus.Option{}
	grpc_logrus.ReplaceGrpcLogger(logrusEntry)
	return grpc.NewServer(
		grpc_middleware.WithUnaryServerChain(
			grpc_ctxtags.UnaryServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			grpc_logrus.UnaryServerInterceptor(logrusEntry, opts...),
		),
		grpc_middleware.WithStreamServerChain(
			grpc_ctxtags.StreamServerInterceptor(grpc_ctxtags.WithFieldExtractor(grpc_ctxtags.CodeGenRequestFieldExtractor)),
			grpc_logrus.StreamServerInterceptor(logrusEntry, opts...),
		),
	)
}
