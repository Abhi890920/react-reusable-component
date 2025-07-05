import React, { createContext, useContext, useRef } from 'react';
import { Toast } from 'primereact/toast';
import { ToastMessage } from 'primereact/toast';

type ToastContextType = {
  showToast: (msg: ToastMessage | ToastMessage[]) => void;
};

const ToastContext = createContext<ToastContextType>({
  showToast: () => {},
});

export const useToast = () => useContext(ToastContext);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const toastRef = useRef<Toast>(null);

  const showToast = (msg: ToastMessage | ToastMessage[]) => {
    toastRef.current?.show(msg);
  };

  return (
    <ToastContext.Provider value={{ showToast }}>
      <Toast ref={toastRef} position="top-right" />
      {children}
    </ToastContext.Provider>
  );
};
