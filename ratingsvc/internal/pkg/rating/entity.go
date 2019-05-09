package rating

type Rating struct {
	EntityID int32
	Score    float32
	UserID   int32
	Comment  string
}

type AggregatedRating struct {
	Score float32
	Count int
}