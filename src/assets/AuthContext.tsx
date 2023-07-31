import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import jwt_decode from "jwt-decode";

interface IAuthData {
  accessToken?: string;
}

const useAuthData = () => {
  const [authData, setAuthData] = useState<IAuthData | undefined>();

  const saveAuthData = (authData: IAuthData) => {
    localStorage.setItem("authData", JSON.stringify(authData));
    setAuthData(authData);
  };

  const removeAuthData = () => {
    setAuthData(undefined);
    localStorage.removeItem("authData");
  };

  useEffect(() => {
    const localAuth = localStorage.getItem("authData");

    if (localAuth) {
      const parsed: IAuthData = JSON.parse(localAuth);
      if (parsed.accessToken) {
        const decoded: {
          exp: number;
          iat: number;
          id: string;
        } = jwt_decode(parsed.accessToken);
        if (decoded.exp < Date.now()) setAuthData(JSON.parse(localAuth));
        else removeAuthData();
      }
    }
  }, []);

  const memoedValue = useMemo(() => {
    return {
      authData,
      saveAuthData,
      removeAuthData,
    };
  }, [authData]);

  return memoedValue;
};

type AuthContextDataType = ReturnType<typeof useAuthData>;

const AuthContext = createContext<AuthContextDataType>(
  {} as AuthContextDataType
);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const contextValue = useAuthData();

  return (
    <AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>
  );
};

const useAuthContext = () => {
  const auth = useContext(AuthContext);

  return auth;
};

export default useAuthContext;
