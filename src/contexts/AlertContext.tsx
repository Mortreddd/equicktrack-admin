import { createContext, useContext } from "react";

type AlertType = "success" | "error" | "info" | "warning";

export interface Alert {
  message: string;
  type?: AlertType;
}

export interface AlertContextProps {
  showAlert: (message: string, type: AlertType) => void;
}
export const AlertContext = createContext<AlertContextProps>({
  showAlert: () => {},
});

export function useAlert() {
  const context = useContext(AlertContext);
  if (context === undefined) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
}
