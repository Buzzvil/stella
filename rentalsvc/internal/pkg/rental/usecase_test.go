package rental_test

import (
	"testing"

	"github.com/Buzzvil/stella/rentalsvc/internal/pkg/rental"
	"github.com/bxcodec/faker"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/suite"
)

func (ts *UsecaseTestSuite) Test_GetResourceStatus() {
	var rr *rental.Rental
	err := faker.FakeData(&rr)
	ts.repo.On("GetLastRentalByEntityID", mock.Anything).Return(rr, nil).Once()

	result, err := ts.usecase.GetResourceStatus(rr.EntityID)

	ts.NoError(err)
	if rr.IsReturned {
		ts.Equal(result.Availability, rental.Available)
	} else {
		ts.Equal(result.Availability, rental.Unavailable)
	}
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_ListResourceWatchers() {
	var rrs []*rental.Watch
	ts.NoError(faker.FakeData(&rrs))
	ts.repo.On("ListWatchByEntityID", mock.Anything).Return(rrs, nil).Once()

	ids, err := ts.usecase.ListResourceWatchers(1234)

	ts.NoError(err)
	for i, rr := range rrs {
		ts.Equal(rr.UserID, ids[i])
	}
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_RentResource() {
	var rr *rental.Rental
	ts.NoError(faker.FakeData(&rr))
	rr.IsReturned = true
	ts.repo.On("GetLastRentalByEntityID", rr.EntityID).Return(rr, nil).Once()
	ts.repo.On("UpsertRental", mock.Anything).Return(nil).Once()

	err := ts.usecase.RentResource(rr.UserID+1, rr.EntityID)

	ts.NoError(err)
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_ReturnResource() {
	var rr *rental.Rental
	ts.NoError(faker.FakeData(&rr))
	rr.IsReturned = false
	ts.repo.On("GetLastRentalByEntityID", rr.EntityID).Return(rr, nil).Once()
	ts.repo.On("UpsertRental", mock.Anything).Return(nil).Once()

	err := ts.usecase.ReturnResource(rr.UserID, rr.EntityID)

	ts.NoError(err)
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_WatchResource() {
	var rr *rental.Rental
	ts.NoError(faker.FakeData(&rr))
	rr.IsReturned = false
	ts.repo.On("GetLastRentalByEntityID", rr.EntityID).Return(rr, nil).Once()
	ts.repo.On("InsertWatch", mock.Anything).Return(nil).Once()

	err := ts.usecase.WatchResource(rr.UserID+1, rr.EntityID)

	ts.NoError(err)
	ts.repo.AssertExpectations(ts.T())
}

// If the book is already taken by the user, reserveResource request will be failed.
func (ts *UsecaseTestSuite) Test_WatchResource_AlreadyTaken() {
	var rr *rental.Rental
	ts.NoError(faker.FakeData(&rr))
	rr.IsReturned = true
	ts.repo.On("GetLastRentalByEntityID", rr.EntityID).Return(rr, nil).Once()

	err := ts.usecase.WatchResource(rr.UserID, rr.EntityID)

	ts.Error(err)
	ts.repo.AssertExpectations(ts.T())
}

func (ts *UsecaseTestSuite) Test_UnwatchResource() {
	ts.repo.On("DeleteWatch", mock.Anything).Return(nil).Once()

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

func (r *mockRepo) UpsertRental(request rental.Rental) error {
	ret := r.Called(request)
	return ret.Error(0)
}

func (r *mockRepo) GetLastRentalByEntityID(entityID int64) (*rental.Rental, error) {
	ret := r.Called(entityID)
	return ret.Get(0).(*rental.Rental), ret.Error(1)
}

func (r *mockRepo) ListRentalByUserID(userID int64) ([]*rental.Rental, error) {
	ret := r.Called(userID)
	return ret.Get(0).([]*rental.Rental), ret.Error(1)
}

func (r *mockRepo) ListWatchByEntityID(entityID int64) ([]*rental.Watch, error) {
	ret := r.Called(entityID)
	return ret.Get(0).([]*rental.Watch), ret.Error(1)
}

func (r *mockRepo) ListWatchByUserID(userID int64) ([]*rental.Watch, error) {
	ret := r.Called(userID)
	return ret.Get(0).([]*rental.Watch), ret.Error(1)
}

func (r *mockRepo) InsertWatch(request rental.Watch) error {
	ret := r.Called(request)
	return ret.Error(0)
}

func (r *mockRepo) DeleteWatch(request rental.Watch) error {
	ret := r.Called(request)
	return ret.Error(0)
}
