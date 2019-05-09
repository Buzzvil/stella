package rating

type Usecase interface {
	GetRating(entityID int32) (*AggregatedRating, error)
	GetUserRating(entityID int32, userID int32) (*Rating, error)
	ListRatings(entityID int32) ([]Rating, error)
	ListUserRatings(entityID int32, userID int32) ([]Rating, error)
	UpsertRating(rating Rating) (*Rating, error)
	DeleteRating(entityID int32, userID int32) error
}

type usecase struct {
	repo Repository
}

func NewUsecase(repo Repository) Usecase {
	return &usecase{
		repo: repo,
	}
}

func (u *usecase) GetRating(entityID int32) (*AggregatedRating, error) {
	score, err := u.repo.GetAverageByID(entityID)
	if err != nil {
		return nil, err
	}
	count, err := u.repo.GetCountByID(entityID)
	if err != nil {
		return nil, err
	}

	return &AggregatedRating{
		Score: score,
		Count: count,
	}, nil
}

func (u *usecase) GetUserRating(entityID int32, userID int32) (*Rating, error) {
	rating, err := u.repo.GetByID(entityID, userID)
	if err != nil {
		return nil, err
	}

	return rating, nil
}

func (u *usecase) ListRatings(entityID int32) ([]Rating, error) {
	list, err := u.repo.ListByID(entityID)
	if err != nil {
		return nil, err
	}

	return list, nil
}

func (u *usecase) ListUserRatings(entityID int32, userID int32) ([]Rating, error) {
	list, err := u.repo.ListByUserID(entityID, userID)
	if err != nil {
		return nil, err
	}

	return list, nil
}

func (u *usecase) UpsertRating(rating Rating) (*Rating, error) {
	r, err := u.repo.Upsert(rating)
	if err != nil {
		return nil, err
	}
	return r, nil
}

func (u *usecase) DeleteRating(entityID int32, userID int32) error {
	return u.repo.Delete(entityID, userID)
}
