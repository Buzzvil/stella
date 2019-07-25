import React from "react";
import { AuthProvider } from "../AuthContext/AuthContext";
import { NotificationProvider } from "../NotificationContext/NotificationContext";
import { BookProvider } from "../BookContext/BookContext";
import { UserProvider } from "../UserContext/UserContext";

const AppContext: React.SFC = ({ children }) => (
  <AuthProvider>
    <UserProvider>
      <BookProvider>
        <NotificationProvider>{children}</NotificationProvider>
      </BookProvider>
    </UserProvider>
  </AuthProvider>
);

export default AppContext;
