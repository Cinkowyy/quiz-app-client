import { Form, Input, Button, Typography, App } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import axios from "../../../api/axios";
import { AxiosError } from "axios";
import {
  RegisterErrorType,
  RegisterValidationSchema,
  RegisterValuesType,
} from "./types";

const { Item } = Form;
const { Password: PasswordInput } = Input;
const { Text } = Typography;

const rule = createSchemaFieldRule(RegisterValidationSchema);

const RegisterForm = () => {
  const [form] = Form.useForm<RegisterValuesType>();
  const navigate = useNavigate();
  const { message } = App.useApp();

  const { isPending, mutate: register } = useMutation({
    mutationKey: ["register"],
    mutationFn: async (data: RegisterValuesType) =>
      await axios.post("/identity/register", data),
    onError: (error: AxiosError<RegisterErrorType>) => {
      const errorData = error.response?.data;

      if (errorData?.error == "UserExists") {
        form.setFields([
          {
            name: "email",
            errors: ["Użytkownik o takim emailu już istnieje"],
          },
        ]);
      }
    },
    onSuccess: () => {
      message.success({
        content: "Konto zostało utworzone",
        duration: 5,
      });
      navigate("/sign-in");
    },
  });

  const onFinish = async (values: RegisterValuesType) => {
    register(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout={"vertical"}>
      <Item label="Nickname" name="nickname" rules={[rule]}>
        <Input size="large" placeholder="Jak chcesz być nazywany?" />
      </Item>
      <Item label="E-mail" name="email" rules={[rule]}>
        <Input size="large" placeholder="Jaki jest twój e-mail?" />
      </Item>
      <Item label="Hasło" name="password" rules={[rule]}>
        <PasswordInput size="large" placeholder="Wpisz bezpieczne hasło" />
      </Item>
      <Button loading={isPending} size="large" type="primary" htmlType="submit">
        Utwórz konto
      </Button>

      <Text style={{ marginLeft: 16 }}>
        Posiadasz już konto? <Link to="/sign-in">Zaloguj się</Link>
      </Text>
    </Form>
  );
};
export default RegisterForm;
