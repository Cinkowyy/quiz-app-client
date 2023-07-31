import MainCard from "../components/MainCard.styled";
import Button from "../components/Button.styled";
import { Form, Input, InputWrapper } from "../components/FormComponents.styled";
import { Link, useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "../../api/axios";
import ViewTitle from "../components/ViewTitle.styled";

const registerSchema = z.object({
  nickname: z.string().min(3).max(24),
  email: z.string().email(),
  password: z.string().min(8).max(24),
});

type RegisterFormType = z.infer<typeof registerSchema>;

const RegisterView = () => {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormType>({
    mode: "all",
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
    },
    resolver: zodResolver(registerSchema),
  });

  const onSumbit: SubmitHandler<RegisterFormType> = async (data) => {
    try {
      await axios.post("/identity/register", {
        ...data,
      });

      navigate("/login", {
        replace: true,
      });
    } catch (error: any) {
      if (error?.response?.data?.message == "User already exists")
        setError("email", { message: "Ten email jest już zajęty" });
      else console.log(error);
    }
  };

  return (
    <MainCard>
      <ViewTitle>Utwórz konto</ViewTitle>
      <Form onSubmit={handleSubmit(onSumbit)}>
        <InputWrapper>
          <label htmlFor="nickname">Nickname</label>
          <Input
            type="text"
            id="nickname"
            placeholder="Wpisz swój nick"
            {...register("nickname")}
            iserror={errors.nickname?.message ? true : false}
          />
        </InputWrapper>
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
        <Button type="filled">Utwórz konto</Button>
        <p>
          Posiadasz juz konto? <Link to="/login">Zaloguj się</Link>
        </p>
      </Form>
    </MainCard>
  );
};

export default RegisterView;
