import React, { useState, useContext, createContext } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const SnackbarContext = createContext({});

export function useSnackbar() {
  return useContext(SnackbarContext);
}

export function SnackbarProvider({ children }) {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [type, setType] = useState("");

  const showSnackbar = (message, severity = "success") => {
    setMessage(message);
    setType(severity);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ showSnackbar }}>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
      >
        <Alert
          onClose={handleClose}
          variant="filled"
          severity={type}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      {children}
    </SnackbarContext.Provider>
  );
}
