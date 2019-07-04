package rental_test

import (
	"testing"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	"github.com/bxcodec/faker"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

func (ts *UsecaseTestSuite) Test_GetResourceStatus() {
	var rs *rental.ResourceStatus
	err := faker.FakeData(&rs)
	ts.repo.On("GetResourceStatus", mock.Anything).Return(rs, nil).Once()

	result, err := ts.usecase.GetResourceStatus(rs.EntityID)

	ts.NoError(err)
	ts.Equal(rs, result)
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_GetResourceWatchingList() {
	var rrs []*rental.WatchRequest
	err := faker.FakeData(&rrs)
	ts.NoError(err)
	ts.repo.On("ListWatchRequestByEntityID", mock.Anything).Return(rrs, nil).Once()

	ids, err := ts.usecase.GetResourceWatchingList(1234)

	ts.NoError(err)
	for i, rr := range rrs {
		ts.Equal(rr.UserID, ids[i])
	}
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_RentResource() {
	var rs *rental.ResourceStatus
	err := faker.FakeData(&rs)
	ts.NoError(err)
	rs.Availability = rental.Available
	ts.repo.On("GetResourceStatus", rs.EntityID).Return(rs, nil).Once()
	ts.repo.On("SetResourceStatus", mock.Anything).Return(nil).Once()

	err = ts.usecase.RentResource(*rs.HolderID, rs.EntityID)

	ts.NoError(err)
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_ReturnResource() {
	var rs *rental.ResourceStatus
	err := faker.FakeData(&rs)
	ts.NoError(err)
	rs.Availability = rental.Unavailable
	ts.repo.On("GetResourceStatus", rs.EntityID).Return(rs, nil).Once()
	ts.repo.On("SetResourceStatus", mock.Anything).Return(nil).Once()

	err = ts.usecase.ReturnResource(*rs.HolderID, rs.EntityID)

	ts.NoError(err)
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_WatchResource() {
	var rs *rental.ResourceStatus
	err := faker.FakeData(&rs)
	ts.NoError(err)
	rs.Availability = rental.Unavailable
	ts.repo.On("GetResourceStatus", rs.EntityID).Return(rs, nil).Once()
	ts.repo.On("AddWatchRequest", mock.Anything).Return(nil).Once()

	err = ts.usecase.WatchResource(*rs.HolderID+1, rs.EntityID)

	ts.NoError(err)
	ts.repo.AssertExpectations(ts.T())
}

// If the book is already taken by the user, reserveResource request will be failed.
func (ts *UsecaseTestSuite) Test_WatchResource_AlreadyTaken() {
	var rs *rental.ResourceStatus
	err := faker.FakeData(&rs)
	ts.NoError(err)
	rs.Availability = rental.Unavailable
	ts.repo.On("GetResourceStatus", rs.EntityID).Return(rs, nil).Once()

	err = ts.usecase.WatchResource(*rs.HolderID, rs.EntityID)

	ts.Error(err)
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_UnwatchResource() {
	ts.repo.On("RemoveWatchRequest", mock.Anything).Return(nil).Once()

	err := ts.usecase.UnwatchResource(1111, 2222)

	ts.NoError(err)
	ts.repo.AssertExpectations(ts.T())
}

func TestUsecaseSuite(t *testing.T) {
	suite.Run(t, new(UsecaseTestSuite))
}

var (
	_ suite.SetupTestSuite = &UsecaseTestSuite{}
)

type UsecaseTestSuite struct {
	suite.Suite
	repo    *mockRepo
	usecase rental.Usecase
}

func (ts *UsecaseTestSuite) SetupTest() {
	ts.repo = new(mockRepo)
	ts.usecase = rental.NewUsecase(ts.repo)
}

var _ rental.Repository = &mockRepo{}

type mockRepo struct {
	mock.Mock
}

func (r *mockRepo) GetResourceStatus(entityID int64) (*rental.ResourceStatus, error) {
	ret := r.Called(entityID)
	return ret.Get(0).(*rental.ResourceStatus), ret.Error(1)
}
func (r *mockRepo) SetResourceStatus(status rental.ResourceStatus) error {
	ret := r.Called(status)
	return ret.Error(0)
}
func (r *mockRepo) ListWatchRequestByEntityID(entityID int64) ([]*rental.WatchRequest, error) {
	ret := r.Called(entityID)
	return ret.Get(0).([]*rental.WatchRequest), ret.Error(1)
}
func (r *mockRepo) AddWatchRequest(request rental.WatchRequest) error {
	ret := r.Called(request)
	return ret.Error(0)
}
func (r *mockRepo) RemoveWatchRequest(request rental.WatchRequest) error {
	ret := r.Called(request)
	return ret.Error(0)
}
