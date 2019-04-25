package rental

type UnavailableError struct{}

type InvalidOperationError struct{}

func (UnavailableError) Error() string {
	return "not available"
}
func (InvalidOperationError) Error() string {
	return "invalid operation"
}
