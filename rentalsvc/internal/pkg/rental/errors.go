package rental

type InvalidOperationError struct{}

func (InvalidOperationError) Error() string {
	return "invalid operation"
}
