import { Card } from "antd";
import LoginForm from "@features/LoginForm/LoginForm";
import PageTitle from "@/components/PageTitle/PageTitle";

const LoginPage = () => {
  return (
    <>
      <PageTitle>Zaloguj się</PageTitle>
      <Card style={{ width: 500 }} bordered={false}>
        <LoginForm />
      </Card>
    </>
  );
};
export default LoginPage;
