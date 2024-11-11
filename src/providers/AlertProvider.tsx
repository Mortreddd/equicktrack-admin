import Alert from "@/components/Alert";
import DangerIcon from "@/components/common/icons/DangerIcon";
import InfoIcon from "@/components/common/icons/InfoIcon";
import SuccessIcon from "@/components/common/icons/SuccessIcon";
import WarningIcon from "@/components/common/icons/WarningIcon";
import {
  Alert as AlertModel,
  AlertContext,
  AlertContextProps,
} from "@/contexts/AlertContext";
import { FC, ReactNode, useEffect, useState } from "react";

interface AlertProviderProps {
  children: ReactNode;
}

export const AlertProvider: FC<AlertProviderProps> = ({ children }) => {
  const [alertMessages, setAlertMessages] = useState<AlertModel[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setAlertMessages((prevItems) => {
        if (prevItems.length > 0) {
          return prevItems.slice(1);
        }
        return prevItems;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const contextValue: AlertContextProps = {
    showAlert: (message, type) => {
      const newAlert: AlertModel = {
        message,
        type,
      };
      setAlertMessages((prev) => [...prev, newAlert]);
    },
  };

  return (
    <AlertContext.Provider value={contextValue}>
      <main className="antialiased bg-transparent w-full h-[100dvh]">
        {children}
        {alertMessages.map((alert, index) => (
          <Alert
            key={index}
            className={`fixed right-10 bottom-10 transition-all w-fit duration-200 translate-x-5 ease-in-out alert alert-${alert.type}`}
          >
            {alert.type === "error" && <DangerIcon />}
            {alert.type === "warning" && <WarningIcon />}
            {alert.type === "info" && <InfoIcon />}
            {alert.type === "success" && <SuccessIcon />}
            <span>{alert.message}</span>
          </Alert>
        ))}
      </main>
    </AlertContext.Provider>
  );
};
