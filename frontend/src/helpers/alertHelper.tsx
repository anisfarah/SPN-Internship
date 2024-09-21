'use client';
import { AlertContextValue, IAlert } from '@/types/helpers.type';
import React, { createContext, useContext, useState } from 'react';

import Alert from '@/components/ui/alert';

/**
 * Context to provide alert information to its children.
 */
const AlertContext = createContext<AlertContextValue | null>(null);

/**
 * Creates an AlertProvider component to provide alert context to its children.
 *
 * @param {{ children: React.ReactNode }} param - The children to be wrapped by the AlertProvider.
 * @return {React.JSX.Element} The JSX element representing the AlertProvider component.
 */
export const AlertProvider = ({ children }: { children: React.ReactNode }): React.JSX.Element => {
  const [alert, setAlert] = useState<IAlert | null>(null);

  return (
    <AlertContext.Provider value={{ alert, setAlert }}>
      <div className="relative flex w-full items-center justify-center">
        <Alert />
      </div>
      {children}
    </AlertContext.Provider>
  );
};

/**
 * Returns the AlertContext from the React context using the useContext hook,
 * strongly typed.
 *
 * @returns {AlertContextValue} The AlertContext from the React context.
 */
export const useAlert = (): AlertContextValue => {
  const context = useContext<AlertContextValue | null>(AlertContext);
  if (!context) {
    return { alert: null, setAlert: () => null };
  }

  return context;
};
