package rental

type Usecase interface {
	GetResourceAvailability(entityID int64) (ResourceAvailability, error)
	RentResource(userID int64, entityID int64) error
	ReturnResource(userID int64, entityID int64) error
	ReserveResource(userID int64, entityID int64) error
	CancelResource(userID int64, entityID int64) error
}

type usecase struct {
	repo Repository
}

var _ Usecase = &usecase{}

func (u *usecase) GetResourceAvailability(entityID int64) (ResourceAvailability, error) {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return Unavailable, err
	}
	return status.Availablility, nil
}

func (u *usecase) RentResource(userID int64, entityID int64) error {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return err
	}
	if status.Availablility != Available {
		return InvalidOperationError{}
	}
	status.Availablility = Unavailable
	status.Holder = &userID
	if err != nil {
		return err
	}
	return u.repo.SetResourceStatus(status)
}

func (u *usecase) ReturnResource(userID int64, entityID int64) error {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return err
	}
	if status.Availablility == Available {
		return nil
	}
	status.Availablility = Available
	status.Holder = nil
	return u.repo.SetResourceStatus(status)
}

func (u *usecase) ReserveResource(userID int64, entityID int64) error {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return err
	}
	if status.Availablility == Available {
		return InvalidOperationError{}
	}

	return u.repo.AddReserveRequest(ReserveRequest{
		EntityID: entityID,
		UserID:   userID,
	})
}

func (u *usecase) CancelResource(userID int64, entityID int64) error {
	return u.repo.RemoveReserveRequest(ReserveRequest{
		EntityID: entityID,
		UserID:   userID,
	})
}
