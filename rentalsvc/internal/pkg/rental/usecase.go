package rental

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
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return &ResourceStatus{Availability: Unavailable}, err
	}
	return status, nil
}

func (u *usecase) GetUserStatus(entityID int64) (*UserStatus, error) {
	return nil, nil
}

func (u *usecase) ListResourceWatchers(entityID int64) ([]int64, error) {
	rrs, err := u.repo.ListWatchRequestByEntityID(entityID)
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

func (u *usecase) WatchResource(userID int64, entityID int64) error {
	status, err := u.repo.GetResourceStatus(entityID)
	if err != nil {
		return err
	}
	if status.Availability == Available || *status.HolderID == userID {
		return InvalidOperationError{}
	}

	return u.repo.AddWatchRequest(WatchRequest{
		EntityID: entityID,
		UserID:   userID,
	})
}

func (u *usecase) UnwatchResource(userID int64, entityID int64) error {
	return u.repo.RemoveWatchRequest(WatchRequest{
		EntityID: entityID,
		UserID:   userID,
	})
}

func NewUsecase(repo Repository) Usecase {
	return &usecase{repo}
}
