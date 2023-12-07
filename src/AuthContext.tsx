import { ReactNode, createContext, useState } from "react";

type AuthContextType = {
  accessToken: string;
  refreshToken: string;
};

const useAuthContextValues = () => {
  const [authData, setAuthData] = useState<AuthContextType | null>(null);

  const handleSetAuthData = (data: AuthContextType) => {
    setAuthData(data);
  };

  const removeAuthData = () => {
    setAuthData(null);
  };

  return {
    authData,
    setAuthData: handleSetAuthData,
    removeAuthData,
  };
};

export const AuthContext = createContext<ReturnType<
  typeof useAuthContextValues
> | null>(null);

export const AuthContextProvider = ({ children }: { children: ReactNode }) => {
  const contextValue = useAuthContextValues();
  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};
