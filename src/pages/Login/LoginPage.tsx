import { Card } from "antd";
import LoginForm from "../../components/features/LoginForm/LoginForm";

const LoginPage = () => {
  return (
    <Card title="Zaloguj się" style={{ width: 500 }} bordered={false}>
      <LoginForm />
    </Card>
  );
};
export default LoginPage;
