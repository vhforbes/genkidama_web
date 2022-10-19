import React, { createContext, useContext, useState } from 'react';

interface DrawerContextData {
  open: boolean;
  openClose(): void;
}

interface Props {
  children: React.ReactNode;
}

const DrawerContext = createContext<DrawerContextData>({} as DrawerContextData);

const DrawerProvider = ({ children }: Props) => {
  const [open, setOpen] = useState(false);

  const openClose = () => {
    setOpen(!open);
  };

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <DrawerContext.Provider value={{ open, openClose }}>
      {children}
    </DrawerContext.Provider>
  );
};

const useDrawer = () => {
  const context = useContext(DrawerContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export { DrawerProvider, useDrawer };
