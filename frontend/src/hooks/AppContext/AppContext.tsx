import React from "react";
import { NotificationProvider } from "../NotificationContext/NotificationContext";
import { BookProvider } from "../BookContext/BookContext";

const AppContext: React.SFC = ({ children }) => (
  <BookProvider>
      <NotificationProvider>
        {children}
      </NotificationProvider>
  </BookProvider>
);

export default AppContext;
