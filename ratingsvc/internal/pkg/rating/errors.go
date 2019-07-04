package rating

type InvalidOperationError struct{}

func (InvalidOperationError) Error() string {
	return "invalid operation"
}
