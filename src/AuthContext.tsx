import { ReactNode, createContext } from "react";

type AuthContextType = {
  accessToken: string;
  refreshToken: string;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
