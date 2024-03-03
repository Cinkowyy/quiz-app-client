import { Button, Card, Typography } from "antd";
import useSessionContext from "@/hooks/useSessionContext";

const { Title } = Typography;

const UserHomePage = () => {
  const { logoutMutation, user } = useSessionContext();

  const { isPending, mutate: logout } = logoutMutation;

  return (
    <Card bordered={false} style={{ width: "fit-content", minWidth: "400px" }}>
      <Title level={2} style={{ marginTop: 0 }}>
        Witaj {user?.nickname}
      </Title>
      <Button loading={isPending} onClick={() => logout()} type="primary">
        Wyloguj się
      </Button>
    </Card>
  );
};
export default UserHomePage;
