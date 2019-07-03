package repo

import (
	"github.com/Buzzvil/stella/ratingsvc/internal/pkg/rating"
)

type mapper struct{}

func (mapper) dbRatingToRating(dbr Rating) *rating.Rating {
	return &rating.Rating{
		EntityID: dbr.EntityID,
		Score:    dbr.Score,
		UserID:   dbr.UserID,
		Comment:  dbr.Comment,
	}
}

func (mapper) dbAggregatedRatingToAggregatedRating(dbar AggregatedRating) *rating.AggregatedRating {
	return &rating.AggregatedRating{
		Score: dbar.Score,
		Count: dbar.Count,
	}
}

func (mapper) RatingToDBRating(r rating.Rating) *Rating {
	return &Rating{
		EntityID: r.EntityID,
		Score:    r.Score,
		UserID:   r.UserID,
		Comment:  r.Comment,
	}
}
