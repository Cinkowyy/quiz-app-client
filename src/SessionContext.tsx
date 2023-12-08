import { ReactNode, createContext, useEffect, useState } from "react";
import axios from "./api/axios";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

type AuthStateType = {
  accessToken: string;
  refreshToken: string;
};

const useSessionContextValues = () => {
  const [authData, setAuthData] = useState<AuthStateType | null>(null);
  const queryClient = useQueryClient();

  const handleSetAuthData = (data: AuthStateType) => {
    localStorage.setItem("authData", data.refreshToken);
    setAuthData(data);
  };

  const refreshMutation = useMutation({
    mutationKey: ["refreshToken"],
    mutationFn: async (token: string) => {
      const response = await axios.post<AuthStateType>("/identity/refresh", {
        refreshToken: token,
      });

      return response.data;
    },
    onSuccess: (data) => {
      handleSetAuthData(data);
    },
    onError: () => localStorage.removeItem("authData"),
  });

  const getUserQuery = useQuery({
    queryKey: ["user"],
    queryFn: async () =>
      await axios.get("/identity/getUser", {
        headers: {
          Authorization: `Bearer ${authData?.accessToken}`,
        },
      }),
    enabled: authData !== null,
    staleTime: Infinity,
  });

  const removeAuthData = () => {
    setAuthData(null);
    queryClient.removeQueries({
      queryKey: ["user"],
    });
    localStorage.removeItem("authData");
  };

  const logoutMutation = useMutation({
    mutationFn: async () =>
      await axios.post("/identity/logout", {
        refreshToken: authData?.refreshToken,
      }),
    onSettled: () => {
      removeAuthData();
    },
  });

  const refreshSession = (token: string) => {
    refreshMutation.mutate(token);
  };

  useEffect(() => {
    const localRefreshToken = localStorage.getItem("authData");
    if (!authData && localRefreshToken) refreshSession(localRefreshToken);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    authData,
    setAuthData: handleSetAuthData,
    removeAuthData,
    refreshSession,
    getUserQuery,
    logoutMutation
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
