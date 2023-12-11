import { Flex } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "../../../api/axios";
import useSessionContext from "../../../hooks/useSessionContext";

type QuizType = {
  id: string;
  title: string;
  duration: number;
  author: {
    id: string;
    nickname: string;
  };
};

const QuizzesList = () => {
  const { user } = useSessionContext();

  const { isLoading, data: quizzesList } = useQuery({
    queryKey: ["quizzesList"],
    queryFn: async () => {
      const response = await axios.get<QuizType[]>("/quizzes/getQuizzes");

      if (!user) return response.data;

      return response.data.filter((quiz) => quiz.author.id != user.id);
    },
  });
  if (isLoading && !quizzesList) return <div>Loading...</div>;

  if (quizzesList)
    return (
      <Flex vertical gap={8}>
        {quizzesList.map((quiz) => {
          return <span key={quiz.id}>{quiz.title}</span>;
        })}
      </Flex>
    );
};
export default QuizzesList;
