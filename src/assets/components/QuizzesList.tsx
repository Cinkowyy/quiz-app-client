import { styled } from "styled-components";
import ButtonStyled from "./Button.styled";
import { ReactComponent as RightIcon } from "../images/right-arrow-icon.svg";

import axios from "../../api/axios";
import { useEffect, useState } from "react";
import { IQuiz } from "../../types/quiz";

const QuizzesList = () => {
  const [quizzes, setQuizzes] = useState<IQuiz[] | null>(null);

  useEffect(() => {
    const getQuizzes = async () => {
      try {
        const res = await axios.get<IQuiz[]>("/quizzes/getQuizzes");
        // console.log(res.data);
        setQuizzes(res.data);
      } catch (error) {
        console.log(error);
      }
    };

    getQuizzes();
  }, []);

  return (
    <QuizzesContainer>
      <SectionText>Wszystkie quizy</SectionText>
      <QuizzesListContainer>
        <QuizItem>
          <p>
            Quiz o znajomości polskich podatków
          </p>
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
