import React, { ReactChildren } from "react";
import { NotificationProvider } from "../NotificationContext/NotificationContext";

const AppContext: React.SFC = ({ children }) => (
  <NotificationProvider>{children}</NotificationProvider>
);

export default AppContext;
