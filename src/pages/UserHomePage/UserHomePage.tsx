import { Button, Card } from "antd";
import useAuthContext from "../../hooks/useAuthContext";

const UserHomePage = () => {
  const { removeAuthData } = useAuthContext();

  const logout = () => {
    removeAuthData();
  };
  return (
    <Card>
      <h2>Witaj w QuizzesApp</h2>
      <Button onClick={logout} type="primary">
        Wyloguj się
      </Button>
    </Card>
  );
};
export default UserHomePage;
