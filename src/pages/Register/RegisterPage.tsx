import { Card } from "antd";
import RegisterForm from "@features/RegisterForm/RegisterForm";
import PageTitle from "@/components/PageTitle/PageTitle";

const RegisterPage = () => {
  return (
    <>
      <PageTitle>Utwórz konto</PageTitle>
      <Card style={{ width: 500 }} bordered={false}>
        <RegisterForm />
      </Card>
    </>
  );
};
export default RegisterPage;
