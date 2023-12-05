import { Form, Input, Button, Typography } from "antd";
import { z } from "zod";
import { createSchemaFieldRule } from "antd-zod";
import { Link } from "react-router-dom";

const { Item } = Form;
const { Password: PasswordInput } = Input;
const { Text } = Typography;

const LoginValidationSchema = z.object({
  email: z
    .string({
      required_error: "Email jest wymagany",
    })
    .email({
      message: "Email musi być poprawny",
    }),
  password: z
    .string({
      required_error: "Hasło jest wymagane",
    })
    .min(8, {
      message: "Hasło musi mieć minimum 8 znaków",
    }),
});

type LoginValuesType = z.infer<typeof LoginValidationSchema>;

const rule = createSchemaFieldRule(LoginValidationSchema);

const LoginForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: LoginValuesType) => {
    console.log(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout={"vertical"}>
      <Item label="E-mail" name="email" rules={[rule]}>
        <Input size="large" placeholder="Podaj swój email" />
      </Item>
      <Item label="Hasło" name="password" rules={[rule]}>
        <PasswordInput size="large" placeholder="Podaj hasło" />
      </Item>
      <Button size="large" type="primary" htmlType="submit">
        Zaloguj się
      </Button>

      <Text style={{ marginLeft: 16 }}>
        Nie posiadasz jeszcze konta? <Link to="/sign-up">Zarejestruj się</Link>
      </Text>
    </Form>
  );
};
export default LoginForm;
