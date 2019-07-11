import React, { useReducer, createContext, useContext } from "react";
import { Book } from "../../../proto/booksvc_pb";
import { ResourceStatus } from "../../../proto/rentalsvc_pb";

type BookDetails = Book & {
  rentalStatus?: ResourceStatus;
}

type Action = {
  type: string;
  data?: BookDetails;
  list?: BookDetails[];
};

interface State {
  [key: number]: Book;
}

interface Dispatch {
  (...args: any): void;
}

const BookContext = createContext<[State, Dispatch]>([[], () => {}]);

const Provider = BookContext.Provider;

const reducer = (state: State, action: Action) => {
  switch (action.type) {
    case "SET":
      if (!action.data) return state;
      return {
        ...state,
        [action.data.getId()]: action.data,
      }
    case "SET_MANY":
      if (!action.list) return state;
      return action.list.reduce((a, r) => {
        a[r.getId()] = r;
        return a;
      }, {...state});
    default:
      return state;
  }
};

const BookProvider: React.SFC<{initial?: State}> = ({ children, initial = {} as State}) => {
  return <Provider value={useReducer(reducer, initial)}>{children}</Provider>;
};

const BookConsumer = BookContext.Consumer;

const setBook = (dispatch: Dispatch, data: Book) => {
  dispatch({ type: "SET", data });
};

const setBooks = (dispatch: Dispatch, list: Book[]) => dispatch({ type: "SET_MANY", list });

const useBookContext = () => useContext(BookContext);

export default BookContext;

export { BookProvider, BookConsumer, setBook, setBooks, useBookContext };
