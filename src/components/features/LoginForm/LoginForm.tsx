import { Form, Input, Button, Typography } from "antd";
import { z } from "zod";
import { createSchemaFieldRule } from "antd-zod";
import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { AxiosError } from "axios";
import axios from "../../../api/axios";
import useSessionContext from "../../../hooks/useSessionContext";

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
  password: z.string({
    required_error: "Hasło jest wymagane",
  }),
});

type LoginValuesType = z.infer<typeof LoginValidationSchema>;

const rule = createSchemaFieldRule(LoginValidationSchema);

type LoginErrorType = {
  message: string;
  error: "InvalidCredentials";
};

type LoginResponseType = {
  accessToken: string;
  refreshToken: string;
};

const LoginForm = () => {
  const [form] = Form.useForm();

  const { setAuthData } = useSessionContext();

  const { isPending, mutate: login } = useMutation({
    mutationKey: ["login"],
    mutationFn: async (data: LoginValuesType) => {
      const response = await axios.post<LoginResponseType>(
        "/identity/login",
        data
      );
      return response.data;
    },
    onError: (error: AxiosError<LoginErrorType>) => {
      const errorData = error.response?.data;

      if (errorData?.error == "InvalidCredentials") {
        form.setFields([
          {
            name: "email",
            errors: ["Błędny email lub hasło"],
          },
        ]);
      }
    },
    onSuccess: (data) => {
      setAuthData(data);
    },
  });

  const onFinish = (values: LoginValuesType) => {
    login(values);
  };

  return (
    <Form form={form} onFinish={onFinish} layout={"vertical"}>
      <Item label="E-mail" name="email" rules={[rule]}>
        <Input size="large" placeholder="Podaj swój email" />
      </Item>
      <Item label="Hasło" name="password" rules={[rule]}>
        <PasswordInput size="large" placeholder="Podaj hasło" />
      </Item>
      <Button loading={isPending} size="large" type="primary" htmlType="submit">
        Zaloguj się
      </Button>

      <Text style={{ marginLeft: 16 }}>
        Nie posiadasz jeszcze konta? <Link to="/sign-up">Zarejestruj się</Link>
      </Text>
    </Form>
  );
};
export default LoginForm;
