import { useState, useEffect } from "react";
import { RatingServiceClient } from "proto/ratingsvc_grpc_web_pb";
import { Rating, GetRatingRequest, GetRatingResponse, GetUserRatingRequest, UpsertRatingRequest } from "proto/ratingsvc_pb";

import Loader from "../Loader/Loader";
import { useBookContext, setBookRatingScore } from "../BookContext/BookContext";

const ratingService = new RatingServiceClient(process.env.PUBLIC_URL, null, null);

interface Actions {
  [key: string]: () => void;
}

export interface ratingScoreIfc {
  (bookId: number): [boolean, number | undefined];
}

const getRatingScore: ratingScoreIfc = bookId => {
    const [loading, load] = Loader();
    const [score, setRatingScore] = useState<number>();
    const [_, dispatch] = useBookContext();
    const getRatingScore = (bookId: number) => {
        const req = new GetRatingRequest();
        req.setEntityId(bookId);
        const getRatingPromise: Promise<GetRatingResponse> = new Promise((resolve, reject) => {
            ratingService.getRating(req, {}, (err: any, res: GetRatingResponse) => 
                err ? reject(err) : resolve(res)
            );
        });
        const [cancelled, cancel] = load(
            getRatingPromise.then(r => {
                if (cancelled()) return;
                setBookRatingScore(dispatch, { bookId, score: r.getScore()});
                setRatingScore(r.getScore())
            }).catch(err => {
                console.log(err)
            })
        );
        return cancel;
    };

    useEffect(() => getRatingScore(bookId), [bookId])
    return [loading, score];
}

export default getRatingScore;