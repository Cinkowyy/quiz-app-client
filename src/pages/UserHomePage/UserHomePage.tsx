import { Button, Card } from "antd";
import useSessionContext from "../../hooks/useSessionContext";

const UserHomePage = () => {
  const { logoutMutation } = useSessionContext();

  const { isPending, mutate: logout } = logoutMutation;

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
