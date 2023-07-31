import { styled } from "styled-components";
import MainCard from "../components/MainCard.styled";
import Button from "../components/Button.styled";
import { Form, Input, InputWrapper } from "../components/FormComponents.styled";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../api/axios";
import useAuthContext from "../AuthContext";

const loginSchema = z.object({
  email: z.string(),
  password: z.string(),
});

type LoginFormType = z.infer<typeof loginSchema>;

const LoginView = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormType>({
    mode: "all",
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema),
  });

  const { saveAuthData } = useAuthContext();

  const onSumbit: SubmitHandler<LoginFormType> = async (data) => {
    try {
      const res = await axios.post("/identity/login", {
        ...data,
      });

      saveAuthData({
        accessToken: res.data?.accessToken,
      });

      navigate("/quizzes", {
        replace: true,
      });
    } catch (error: any) {
      if (error?.response?.data?.message == "Invalid credentials") {
        setError("email", { message: "Błędny login lub hasło" });
        setError("password", { message: "Błędny login lub hasło" });
      }
    }
  };

  return (
    <MainCard>
      <ViewTitle>Zaloguj się</ViewTitle>
      <Form onSubmit={handleSubmit(onSumbit)}>
        <InputWrapper>
          <label htmlFor="email">Adres Email</label>
          <Input
            type="text"
            id="email"
            placeholder="Wpisz adres email"
            {...register("email")}
            iserror={errors.email?.message ? true : false}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="password">Hasło</label>
          <Input
            type="password"
            id="password"
            placeholder="Wpisz swoje hasło"
            {...register("password")}
            iserror={errors.password?.message ? true : false}
          />
        </InputWrapper>
        <Button type="filled">Zaloguj</Button>
        <p>
          Nie masz jeszcze konta? <Link to="/register">Zarejestruj się</Link>
        </p>
      </Form>
    </MainCard>
  );
};

export default LoginView;

const ViewTitle = styled.h1`
  color: #555;
  text-align: center;
  font-size: 1.75rem;
  font-weight: 500;
`;
