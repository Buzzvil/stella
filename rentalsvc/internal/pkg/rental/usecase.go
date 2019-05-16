package rental

type Usecase interface {
	GetResourceStatus(entityID int64) (*ResourceStatus, error)
	GetResourceWaitingList(entityID int64) ([]int64, error)
	RentResource(userID int64, entityID int64) error
	ReturnResource(userID int64, entityID int64) error
	ReserveResource(userID int64, entityID int64) error
	CancelResource(userID int64, entityID int64) error
}

type usecase struct {
	repo Repository
}

var _ Usecase = &usecase{}

func (u *usecase) GetResourceStatus(entityID int64) (*ResourceStatus, error) {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return &ResourceStatus{Availability: Unavailable}, err
	}
	return status, nil
}

func (u *usecase) GetResourceWaitingList(entityID int64) ([]int64, error) {
	rrs, err := u.repo.ListReserveRequestByEntityID(entityID)
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
