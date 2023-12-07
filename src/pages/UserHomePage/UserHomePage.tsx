import { Button, Card } from "antd";
import useSessionContext from "../../hooks/useSessionContext";
import axios from "../../api/axios";
import { useMutation } from "@tanstack/react-query";

const UserHomePage = () => {
  const { authData, removeAuthData } = useSessionContext();

  const { isPending, mutate: logout } = useMutation({
    mutationFn: async () =>
      await axios.post("/identity/logout", {
        refreshToken: authData?.refreshToken,
      }),
    onSettled: () => {
      removeAuthData();
    },
  });

  return (
    <Card>
      <h2>Witaj w QuizzesApp</h2>
      <Button loading={isPending} onClick={() => logout()} type="primary">
        Wyloguj się
      </Button>
    </Card>
  );
};
export default UserHomePage;
