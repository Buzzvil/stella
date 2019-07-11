package rental

import (
	"fmt"
)

// Usecase interface definition
type Usecase interface {
	GetResourceStatus(entityID int64) (*ResourceStatus, error)
	GetUserStatus(userID int64) (*UserStatus, error)
	ListResourceWatchers(entityID int64) ([]int64, error)
	RentResource(userID int64, entityID int64) error
	ReturnResource(userID int64, entityID int64) error
	WatchResource(userID int64, entityID int64) error
	UnwatchResource(userID int64, entityID int64) error
}

type usecase struct {
	repo Repository
}

var _ Usecase = &usecase{}

func (u *usecase) GetResourceStatus(entityID int64) (*ResourceStatus, error) {
	rs := ResourceStatus{EntityID: entityID}
	r, err := u.repo.GetLastRentalByEntityID(entityID)
	if err != nil {
		return &ResourceStatus{Availability: Unavailable}, err
	}
	if r != nil && r.IsReturned == false {
		rs.Availability = Unavailable
		rs.HolderID = &r.UserID
	} else {
		rs.Availability = Available
	}
	return &rs, nil
}

func (u *usecase) GetUserStatus(userID int64) (*UserStatus, error) {
	rentedResources, err := u.repo.ListRentalByUserID(userID)
	if err != nil {
		return nil, err
	}
	watchingResources, err := u.repo.ListWatchByUserID(userID)
	if err != nil {
		return nil, err
	}

	us := UserStatus{
		WatchingEntities: make([]int64, 0),
		RentedEntities:   make([]int64, 0),
	}

	for _, hs := range rentedResources {
		if hs.IsReturned {
			us.RentedEntities = append(us.RentedEntities, hs.EntityID)
		} else {
			us.HeldEntities = append(us.HeldEntities, hs.EntityID)
		}
	}

	for _, hs := range watchingResources {
		us.WatchingEntities = append(us.WatchingEntities, hs.EntityID)
	}

	return &us, nil
}

func (u *usecase) ListResourceWatchers(entityID int64) ([]int64, error) {
	rrs, err := u.repo.ListWatchByEntityID(entityID)
	if err != nil {
		return nil, err
	}
	waitings := make([]int64, 0)
	for _, rr := range rrs {
		waitings = append(waitings, rr.UserID)
	}
	return waitings, nil
}

func (u *usecase) RentResource(userID int64, entityID int64) error {
	lastRentReq, err := u.repo.GetLastRentalByEntityID(entityID)
	if err != nil {
		return err
	}
	if lastRentReq != nil && !lastRentReq.IsReturned {
		return InvalidOperationError{}
	}

	rentReq := Rental{
		UserID:   userID,
		EntityID: entityID,
	}

	return u.repo.UpsertRental(rentReq)
}

func (u *usecase) ReturnResource(userID int64, entityID int64) error {
	lastRentReq, err := u.repo.GetLastRentalByEntityID(entityID)
	if err != nil {
		return err
	}

	if lastRentReq.IsReturned == true {
		return nil
	}

	if lastRentReq == nil {
		return fmt.Errorf("entity %v wasn't rented", entityID)
	}

	if lastRentReq.UserID != userID {
		return fmt.Errorf("entity %v wasn't rented by %v", entityID, userID)
	}

	lastRentReq.IsReturned = true
	return u.repo.UpsertRental(*lastRentReq)
}

func (u *usecase) WatchResource(userID int64, entityID int64) error {
	lastRentReq, err := u.repo.GetLastRentalByEntityID(entityID)
	if err != nil {
		return err
	}
	if lastRentReq != nil && (lastRentReq.IsReturned || lastRentReq.UserID == userID) {
		return InvalidOperationError{}
	}

	return u.repo.InsertWatch(Watch{
		EntityID: entityID,
		UserID:   userID,
	})
}

func (u *usecase) UnwatchResource(userID int64, entityID int64) error {
	return u.repo.DeleteWatch(Watch{
		EntityID: entityID,
		UserID:   userID,
	})
}

// NewUsecase returns an Usecase
func NewUsecase(repo Repository) Usecase {
	return &usecase{repo}
}
