import { createContext } from "react";

export interface DashboardContextProps {
  setTitle: (title: string) => void;
  setExpand: (extend: boolean) => void;
  expand: boolean;
  title: string;
}

export const DashboardContext = createContext<DashboardContextProps>({
  setTitle: () => {},
  setExpand: () => {},
  expand: false,
  title: "",
});
