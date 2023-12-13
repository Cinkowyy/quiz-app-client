import { ReactNode } from "react";
import useSessionContext from "./hooks/useSessionContext";

const ProtectedRoute = ({
  guestRoute,
  userRoute,
}: {
  guestRoute: ReactNode;
  userRoute: ReactNode;
}) => {
  const { authData, isLocalRefreshToken } = useSessionContext();

  if (authData) return userRoute;

  if (isLocalRefreshToken) return <>Loading...</>;

  return guestRoute;
};
export default ProtectedRoute;
