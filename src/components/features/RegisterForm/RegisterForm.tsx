import { Form, Input, Button, Typography } from "antd";
import { z } from "zod";
import { createSchemaFieldRule } from "antd-zod";
import { Link } from "react-router-dom";

const { Item } = Form;
const { Password: PasswordInput } = Input;
const { Text } = Typography;

const RegisterValidationSchema = z.object({
  nickname: z.string({
    required_error: "Nickname jest wymagany",
  }),
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

type RegisterValuesType = z.infer<typeof RegisterValidationSchema>;

 /* @ts-expect-error/it's working */
const rule = createSchemaFieldRule(RegisterValidationSchema);

const RegisterForm = () => {
  const [form] = Form.useForm();

  const onFinish = (values: RegisterValuesType) => {
    console.log(values);
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
      <Button size="large" type="primary" htmlType="submit">
        Utwórz konto
      </Button>

      <Text style={{ marginLeft: 16 }}>
        Posiadasz już konto? <Link to="/sign-in">Zaloguj się</Link>
      </Text>
    </Form>
  );
};
export default RegisterForm;
