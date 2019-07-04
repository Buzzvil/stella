package rentalsrv_test

import (
	"context"
	"testing"

	"github.com/Buzzvil/stella/rentalsvc/internal/app/rentalsrv"
	"github.com/bxcodec/faker"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	pb "github.com/Buzzvil/stella/rentalsvc/pkg/proto"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

func (ts *ServerTestSuite) Test_GetResourceStatus() {
	var rs *rental.ResourceStatus
	var wl []int64
	ts.NoError(faker.FakeData(&rs))
	ts.NoError(faker.FakeData(&wl))
	ts.usecase.On("GetResourceStatus", rs.EntityID).Return(rs, nil).Once()
	ts.usecase.On("GetResourceWatchingList", rs.EntityID).Return(wl, nil).Once()
	pbReq := pb.GetResourceStatusRequest{EntityId: rs.EntityID}

	pbRes, err := ts.server.GetResourceStatus(context.Background(), &pbReq)

	ts.NoError(err)
	ts.Equal(pbRes.EntityId, rs.EntityID)
	for i := range wl {
		ts.Equal(wl[i], pbRes.WatchingUserIds[i])
	}
}

func (ts *ServerTestSuite) Test_RentResource() {
	userID, entityID := ts.getRandomEntityAndUserID()
	ts.usecase.On("RentResource", userID, entityID).Return(nil).Once()
	pbReq := pb.RentResourceRequest{
		EntityId: entityID,
		UserId:   userID,
	}

	res, err := ts.server.RentResource(context.Background(), &pbReq)

	ts.NoError(err)
	ts.NotNil(res)
}

func (ts *ServerTestSuite) Test_ReturnResource() {
	userID, entityID := ts.getRandomEntityAndUserID()
	ts.usecase.On("ReturnResource", userID, entityID).Return(nil).Once()
	pbReq := pb.ReturnResourceRequest{
		EntityId: entityID,
		UserId:   userID,
	}

	res, err := ts.server.ReturnResource(context.Background(), &pbReq)

	ts.NoError(err)
	ts.NotNil(res)
}

func (ts *ServerTestSuite) Test_WatchResource() {
	userID, entityID := ts.getRandomEntityAndUserID()
	ts.usecase.On("WatchResource", userID, entityID).Return(nil).Once()
	pbReq := pb.WatchResourceRequest{
		EntityId: entityID,
		UserId:   userID,
	}

	res, err := ts.server.WatchResource(context.Background(), &pbReq)

	ts.NoError(err)
	ts.NotNil(res)
}

func (ts *ServerTestSuite) Test_UnwatchResource() {
	userID, entityID := ts.getRandomEntityAndUserID()
	ts.usecase.On("UnwatchResource", userID, entityID).Return(nil).Once()
	pbReq := pb.UnwatchResourceRequest{
		EntityId: entityID,
		UserId:   userID,
	}

	res, err := ts.server.UnwatchResource(context.Background(), &pbReq)

	ts.NoError(err)
	ts.NotNil(res)
}

func (ts *ServerTestSuite) SetupTest() {
	ts.usecase = new(mockUsecase)
	ts.server = rentalsrv.New(ts.usecase)
}

func (ts *ServerTestSuite) getRandomEntityAndUserID() (int64, int64) {
	var entityID, userID int64
	ts.NoError(faker.FakeData(&entityID))
	ts.NoError(faker.FakeData(&userID))
	return entityID, userID
}

func TestServerSuite(t *testing.T) {
	suite.Run(t, new(ServerTestSuite))
}

type ServerTestSuite struct {
	suite.Suite
	server  pb.RentalServiceServer
	usecase *mockUsecase
}

var _ rental.Usecase = &mockUsecase{}

type mockUsecase struct {
	mock.Mock
}

func (u *mockUsecase) GetResourceStatus(entityID int64) (*rental.ResourceStatus, error) {
	ret := u.Called(entityID)
	return ret.Get(0).(*rental.ResourceStatus), ret.Error(1)
}
func (u *mockUsecase) GetResourceWatchingList(entityID int64) ([]int64, error) {
	ret := u.Called(entityID)
	return ret.Get(0).([]int64), ret.Error(1)
}
func (u *mockUsecase) RentResource(userID int64, entityID int64) error {
	ret := u.Called(userID, entityID)
	return ret.Error(0)
}
func (u *mockUsecase) ReturnResource(userID int64, entityID int64) error {
	ret := u.Called(userID, entityID)
	return ret.Error(0)
}
func (u *mockUsecase) WatchResource(userID int64, entityID int64) error {
	ret := u.Called(userID, entityID)
	return ret.Error(0)
}
func (u *mockUsecase) UnwatchResource(userID int64, entityID int64) error {
	ret := u.Called(userID, entityID)
	return ret.Error(0)
}
