import { styled } from "styled-components";
import MainCard from "../components/MainCard.styled";
import Button from "../components/Button.styled";
import { Link } from "react-router-dom";

const WelcomeView = () => {
  return (
    <MainCard>
      <Title>Quizify</Title>
      <ButtonsContainer>
        <Link to="/quizzes">
          <Button type="filled">Lista Quizów</Button>
        </Link>
        <Link to="/login">
          <Button type="filled">Zaloguj się</Button>
        </Link>
        <Link to="/register">
          <Button type="filled">Utwórz konto</Button>
        </Link>
      </ButtonsContainer>
    </MainCard>
  );
};

export default WelcomeView;

const Title = styled.h1`
  color: #555;
  text-align: center;
  font-size: 2.5rem;
  font-weight: 500;
  margin-bottom: 0;
`;

const ButtonsContainer = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  row-gap: 1.25rem;
  align-items: center;
  justify-content: center;

  a {
    text-decoration: none;
  }
`;
