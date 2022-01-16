import React from "react";
import ReactDOM from "react-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { SnackbarProvider } from "./contexts/SnackbarContext";
import { BrowserRouter } from "react-router-dom";
import App from "./App";

ReactDOM.render(
  <BrowserRouter>
    <SnackbarProvider>
      <AuthProvider>
        <App />
      </AuthProvider>
    </SnackbarProvider>
  </BrowserRouter>,
  document.getElementById("root")
);
