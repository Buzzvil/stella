package rental

type Usecase interface {
	GetResourceAvailability(entityID int64) (ResourceAvailability, error)
	PutRequestOnResource(entityID int64, reqType RequestType) error
}

type usecase struct {
	repo Repository
}

var _ Usecase = &usecase{}

func (u *usecase) GetResourceAvailability(entityID int64) (ResourceAvailability, error) {
	return Available, nil
}

func (u *usecase) PutRequestOnResource(entityID int64, reqType RequestType) error {
	return nil
}
