"use client";

import { createContext, useContext, useState } from "react";
import { AlertMain } from "../alert-main";

type AlertContextType = {
  showAlert: (props: {
    title: string;
    description: string;
    type?: "default" | "destructive" | "success";
    duration?: number;
  }) => void;
};

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export function AlertProvider({ children }: { children: React.ReactNode }) {
  const [alertProps, setAlertProps] = useState<{
    show: boolean;
    title: string;
    description: string;
    type: "default" | "destructive" | "success";
    duration: number;
  }>({
    show: false,
    title: "",
    description: "",
    type: "default",
    duration: 3000,
  });

  const showAlert = ({
    title,
    description,
    type = "default",
    duration = 3000,
  }: {
    title: string;
    description: string;
    type?: "default" | "destructive" | "success";
    duration?: number;
  }) => {
    setAlertProps({
      show: true,
      title,
      description,
      type,
      duration,
    });
  };

  return (
    <AlertContext.Provider value={{ showAlert }}>
      {children}
      <AlertMain
        {...alertProps}
        onClose={() => setAlertProps((prev) => ({ ...prev, show: false }))}
      />
    </AlertContext.Provider>
  );
}

export const useAlert = () => {
  const context = useContext(AlertContext);
  if (!context) {
    throw new Error("useAlert must be used within an AlertProvider");
  }
  return context;
};
