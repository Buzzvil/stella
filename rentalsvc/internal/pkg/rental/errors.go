package rental

type UnavailableError struct{}

type InvalidOperationError struct{}

func (ue UnavailableError) Error() string {
	return "not available"
}
func (ue InvalidOperationError) Error() string {
	return "invalid operation"
}
