import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "./api/axios";

type AuthStateType = {
  accessToken: string;
  refreshToken: string;
};

const useSessionContextValues = () => {
  const [authData, setAuthData] = useState<AuthStateType | null>(null);

  const handleSetAuthData = (data: AuthStateType) => {
    localStorage.setItem("authData", data.refreshToken);
    setAuthData(data);
  };

  const removeAuthData = () => {
    setAuthData(null);
    localStorage.removeItem("authData");
  };

  useEffect(() => {
    const localRefreshToken = localStorage.getItem("authData");

    if (localRefreshToken && !authData) {
      axios
        .post<AuthStateType>("/identity/refresh", {
          refreshToken: localRefreshToken,
        })
        .then((response) => {
          handleSetAuthData(response.data);
        })
        .catch(() => {
          localStorage.removeItem("authData");
        });
    }
  });

  return {
    authData,
    setAuthData: handleSetAuthData,
    removeAuthData,
  };
};

export const SessionContext = createContext<ReturnType<
  typeof useSessionContextValues
> | null>(null);

export const SessionContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const contextValue = useSessionContextValues();
  return (
    <SessionContext.Provider value={contextValue}>
      {children}
    </SessionContext.Provider>
  );
};
