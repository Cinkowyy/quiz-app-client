import { ReactNode } from "react";
import useSessionContext from "./hooks/useSessionContext";

const ProtectedRoute = ({
  guestRoute,
  userRoute,
}: {
  guestRoute: ReactNode;
  userRoute: ReactNode;
}) => {
  const { authData } = useSessionContext();

  if (!authData) return guestRoute;

  return userRoute;
};
export default ProtectedRoute;
