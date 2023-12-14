import { Card } from "antd";
import RegisterForm from "@features/RegisterForm/RegisterForm";

const RegisterPage = () => {
  return (
    <Card title="Utwórz konto" style={{width: 500}} bordered={false}>
      <RegisterForm />
    </Card>
  );
};
export default RegisterPage;
