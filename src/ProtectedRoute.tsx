import { ReactNode } from "react";
import useAuthContext from "./hooks/useAuthContext";

const ProtectedRoute = ({
  guestRoute,
  userRoute,
}: {
  guestRoute: ReactNode;
  userRoute: ReactNode;
}) => {
  const { authData } = useAuthContext();

  if (!authData) return guestRoute;

  return userRoute;
};
export default ProtectedRoute;
