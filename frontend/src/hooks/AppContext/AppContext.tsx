import React from "react";
import { AuthProvider } from "../AuthContext/AuthContext";
import { NotificationProvider } from "../NotificationContext/NotificationContext";
import { BookProvider } from "../BookContext/BookContext";

const AppContext: React.SFC = ({ children }) => (
  <AuthProvider>
    <BookProvider>
      <NotificationProvider>{children}</NotificationProvider>
    </BookProvider>
  </AuthProvider>
);

export default AppContext;
