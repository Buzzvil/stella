package user

// Usecase declares user service interface.
type Usecase interface {
	GetUser(id int64) (*User, error)
	GetUsers(ids []int64) ([]*User, error)
	GetUserBySlackUserID(sid string) (*User, error)
	CreateUser(*User) (*User, error)
}

type usecase struct {
	r Repo
}

// NewUsecase creates new auth service.
func NewUsecase(r Repo) Usecase {
	return &usecase{r: r}
}

func (uc *usecase) GetUser(id int64) (*User, error) {
	return uc.r.GetUser(id)
}

func (uc *usecase) GetUsers(ids []int64) ([]*User, error) {
	return uc.r.GetUsers(ids)
}

func (uc *usecase) GetUserBySlackUserID(sid string) (*User, error) {
	return uc.r.GetUserBySlackUserID(sid)
}

func (uc *usecase) CreateUser(u *User) (*User, error) {
	return uc.r.CreateUser(u)
}
