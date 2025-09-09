// FullScreenContext.tsx
import { createContext, useContext, useState, ReactNode } from "react";

// Create a context to manage full-screen mode
const FullScreenContext = createContext<
  { isFullScreen: boolean; setFullScreen: (value: boolean) => void } | undefined
>(undefined);

export const FullScreenProvider = ({ children }: { children: ReactNode }) => {
  const [isFullScreen, setFullScreen] = useState(false);

  return (
    <FullScreenContext.Provider value={{ isFullScreen, setFullScreen }}>
      {children}
    </FullScreenContext.Provider>
  );
};

export const useFullScreen = () => {
  const context = useContext(FullScreenContext);
  if (!context) {
    throw new Error("useFullScreen must be used within a FullScreenProvider");
  }
  return context;
};
