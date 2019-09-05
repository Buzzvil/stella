import React, { useReducer, createContext, useContext } from "react";
import { Book } from "../../../proto/booksvc_pb";
import { ResourceStatus } from "../../../proto/rentalsvc_pb";

type BookDetails = Book & {
  rentalStatus?: ResourceStatus;
  ratingScore?: number;
  userRatingScore?: number;
};

type Action = {
  type: string;
  data?: BookDetails;
  list?: BookDetails[];
  status?: ResourceStatus;
  rating?: Rating;
};

interface State {
  [key: number]: BookDetails;
}

interface Dispatch {
  (...args: any): void;
}

interface Rating {
  bookId: number;
  score: number;
}

const BookContext = createContext<[State, Dispatch]>([[], () => {}]);

const Provider = BookContext.Provider;

const reducer = (state: State, action: Action): State => {
  let book;
  switch (action.type) {
    case "SET":
      if (!action.data) return state;
      return {
        ...state,
        [action.data.getId()]: action.data
      };
    case "SET_BOOK_STATUS":
      if (!action.status || !state[action.status.getEntityId()]) return state;
      book = state[action.status.getEntityId()];
      return {
        ...state,
        [book.getId()]: Object.assign(book, {
          rentalStatus: action.status
        }) as BookDetails
      };
    case "SET_BOOK_SCORE":
      if (!action.rating || !state[action.rating.bookId]) return state;
      book = state[action.rating.bookId];
      return {
        ...state,
        [action.rating.bookId]: Object.assign(book, {
          ratingScore: action.rating.score
        }) as BookDetails
      };
    case "SET_BOOK_USER_SCORE":
      if (!action.rating || !state[action.rating.bookId]) return state;
      book = state[action.rating.bookId];
      return {
        ...state,
        [action.rating.bookId]: Object.assign(book, {
          userRatingScore: action.rating.score
        }) as BookDetails
      };
    case "SET_MANY":
      if (!action.list) return state;
      return action.list.reduce(
        (a, r) => {
          a[r.getId()] = r;
          return a;
        },
        { ...state }
      );
    default:
      return state;
  }
};

const BookProvider: React.SFC<{ initial?: State }> = ({
  children,
  initial = {} as State
}) => {
  return <Provider value={useReducer(reducer, initial)}>{children}</Provider>;
};

const BookConsumer = BookContext.Consumer;

const setBook = (dispatch: Dispatch, data: Book) => {
  dispatch({ type: "SET", data });
};

const setBooks = (dispatch: Dispatch, list: Book[]) =>
  dispatch({ type: "SET_MANY", list });
const setBookStatus = (dispatch: Dispatch, status: ResourceStatus) =>
  dispatch({ type: "SET_BOOK_STATUS", status });
const setBookRatingScore = (dispatch: Dispatch, rating: Rating) =>
  dispatch({ type: "SET_BOOK_SCORE", rating });
const setBookUserRatingScore = (dispatch: Dispatch, rating: Rating) =>
  dispatch({ type: "SET_BOOK_USER_SCORE", rating });

const useBookContext = () => useContext(BookContext);

export default BookContext;

export {
  BookProvider,
  BookConsumer,
  setBook,
  setBooks,
  setBookStatus,
  setBookRatingScore,
  setBookUserRatingScore,
  useBookContext
};
