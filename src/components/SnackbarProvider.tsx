import React, { createContext, useContext, useState, useCallback } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

interface SnackbarContextType {
  enqueueSnackbar: (
    message: string,
    severity?: "error" | "success" | "info" | "warning"
  ) => void;
}

const SnackbarContext = createContext<SnackbarContextType | undefined>(
  undefined
);

export const useSnackbar = () => {
  const ctx = useContext(SnackbarContext);
  if (!ctx)
    throw new Error("useSnackbar must be used within a SnackbarProvider");
  return ctx;
};

export const SnackbarProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<
    "error" | "success" | "info" | "warning"
  >("info");

  const enqueueSnackbar = useCallback(
    (msg: string, sev: "error" | "success" | "info" | "warning" = "info") => {
      setMessage(msg);
      setSeverity(sev);
      setOpen(true);
    },
    []
  );

  const handleClose = (_: any, reason?: string) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <SnackbarContext.Provider value={{ enqueueSnackbar }}>
      {children}
      <Snackbar
        open={open}
        autoHideDuration={4000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
          {message}
        </Alert>
      </Snackbar>
    </SnackbarContext.Provider>
  );
};
