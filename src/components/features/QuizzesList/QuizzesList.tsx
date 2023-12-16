import { useQuery } from "@tanstack/react-query";
import axios from "../../../api/axios";
import useSessionContext from "../../../hooks/useSessionContext";
import { QuizType } from "./types";
import styles from "./QuizzesList.module.scss";
import QuizCard from "./components/QuizCard";

const QuizzesList = () => {
  const { user } = useSessionContext();

  const {
    isLoading,
    isError,
    data: quizzesList,
  } = useQuery({
    queryKey: ["quizzesList"],
    queryFn: async () => {
      const response = await axios.get<QuizType[]>("/quizzes/getQuizzes");

      if (!user) return response.data;

      return response.data.filter((quiz) => quiz.author.id != user.id);
    },
  });
  if (!quizzesList && isLoading) return <div>Loading...</div>;

  if (!quizzesList && isError) return <div>Wystąpił błąd</div>;

  if (quizzesList)
    return (
      <div className={styles["quizzes-grid"]}>
        {quizzesList.map((quiz) => {
          return <QuizCard quiz={quiz} key={quiz.id} />;
        })}
      </div>
    );
};
export default QuizzesList;
