import { createContext, useContext } from 'react';
import React, { useState } from 'react';
const AppContext = createContext();

function AppProvider({ children }) {
  const [hideSidebar, setHideSidebar] = useState(false);

  return (
    <AppContext.Provider value={{ hideSidebar, setHideSidebar }}>
      {children}
    </AppContext.Provider>
  );
}

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, AppContext };
