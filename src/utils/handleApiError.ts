export function handleApiError(
  error: any,
  enqueueSnackbar: (
    msg: string,
    sev?: "error" | "success" | "info" | "warning"
  ) => void,
  action?: string
) {
  const status = error?.status;
  if (status === 500) {
    enqueueSnackbar("Your DAP is not responding.", "error");
  } else if (status === 404) {
    enqueueSnackbar("Resource not found (404)", "error");
  } else {
    enqueueSnackbar(
      action ? `Error performing ${action}` : "An unexpected error occurred",
      "error"
    );
  }
}
