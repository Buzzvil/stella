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
	return status.Availability, nil
}

func (u *usecase) RentResource(userID int64, entityID int64) error {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return err
	}
	if status.Availability != Available {
		return InvalidOperationError{}
	}
	status.Availability = Unavailable
	status.HolderID = &userID
	if err != nil {
		return err
	}
	return u.repo.SetResourceStatus(*status)
}

func (u *usecase) ReturnResource(userID int64, entityID int64) error {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return err
	}
	if status.Availability == Available {
		return nil
	}
	status.Availability = Available
	status.HolderID = nil
	return u.repo.SetResourceStatus(*status)
}

func (u *usecase) ReserveResource(userID int64, entityID int64) error {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return err
	}
	if status.Availability == Available {
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

func NewUsecase(repo Repository) Usecase {
	return &usecase{repo}
}
