import { styled } from "styled-components";
import ButtonStyled from "./Button.styled";
import { ReactComponent as RightIcon } from "../images/right-arrow-icon.svg";

import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { IQuiz } from "../../types/quiz";
import { useOutletContext } from "react-router-dom";
import { IUserData } from "../../types/user";

const QuizzesList = () => {
  const userData = useOutletContext<IUserData | null>();
  const [quizzes, setQuizzes] = useState<IQuiz[] | null>(null);
  const [userQuizzes, setUserQuizzes] = useState<IQuiz[] | null>(null);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get<IQuiz[]>("/quizzes/getQuizzes");
        // console.log(res.data);
        if (userData) {
          const filteredQuizzes = res.data.filter(
            (quiz) => quiz.author._id === userData._id
          );
          if (filteredQuizzes.length > 0) {
            setUserQuizzes(filteredQuizzes);
          }
          setQuizzes(
            res.data.filter((quiz) => quiz.author._id !== userData._id)
          );
        } else {
          setQuizzes(res.data);
          setUserQuizzes(null);
        }
      } catch (error) {
        console.log(error);
      }
    };

    getQuizzes();
  }, [userData]);

  return (
    <QuizzesContainer>
      {userData ? (
        <QuizzesListContainer>
          {userQuizzes ? <SectionText>Twoje quizy</SectionText> : null}
          {userQuizzes ? (
            userQuizzes.map((quiz) => {
              return (
                <QuizItem key={quiz._id}>
                  <p>{quiz.title}</p>
                  <ButtonStyled type={"filled"}>
                    Rozwiąż
                    <RightIcon />
                  </ButtonStyled>
                </QuizItem>
              );
            })
          ) : (
            <NoQuizzesItem>
              <p>Nie utworzyłeś jeszcze quizu</p>
            </NoQuizzesItem>
          )}
        </QuizzesListContainer>
      ) : null}
      <SectionText>Wszystkie quizy</SectionText>
      <QuizzesListContainer>
        <QuizItem>
          <p>Quiz o znajomości polskich podatków</p>
          <ButtonStyled type={"filled"}>
            Rozwiąż
            <RightIcon />
          </ButtonStyled>
        </QuizItem>
        {quizzes
          ? quizzes.map((quiz) => {
              return (
                <QuizItem key={quiz._id}>
                  <p>{quiz.title}</p>
                  <ButtonStyled type={"filled"}>
                    Rozwiąż
                    <RightIcon />
                  </ButtonStyled>
                </QuizItem>
              );
            })
          : null}
      </QuizzesListContainer>
    </QuizzesContainer>
  );
};

export default QuizzesList;

const QuizzesContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1rem 0;
  row-gap: 1rem;
`;

const SectionText = styled.p`
  color: #555;
  font-size: 1rem;
  font-weight: 500;
  margin: 0;
`;

const QuizzesListContainer = styled.div`
  display: flex;
  flex-direction: column;
  row-gap: 0.5rem;
`;

const QuizItem = styled.div`
  flex-grow: 1;
  padding: 0.75rem 0.5rem;
  border-radius: 0.625rem;
  border: 1px solid #555;
  display: flex;
  align-items: center;
  column-gap: 0.75rem;
  justify-content: space-between;

  p {
    color: #000;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }
`;

const NoQuizzesItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 0.625rem;
  border: 1px solid #555;
  flex-grow: 1;
  padding: 1rem 0;

  p {
    color: #555;
    text-align: center;
    font-size: 1rem;
    font-weight: 500;
    margin: 0;
  }
`;
