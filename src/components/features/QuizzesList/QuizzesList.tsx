import { Button, Divider, Flex, List, Space } from "antd";
import { useQuery } from "@tanstack/react-query";
import axios from "../../../api/axios";
import useSessionContext from "../../../hooks/useSessionContext";

type QuizType = {
  id: string;
  title: string;
  duration: number;
  category: string;
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
      <List
        size="large"
        dataSource={quizzesList}
        renderItem={(quiz) => (
          <List.Item style={{ paddingInline: 0 }}>
            <Flex
              align="center"
              justify="space-between"
              style={{ width: "100%" }}
            >
              <Space>
                <span>{quiz.title}</span>
                <Divider type="vertical" />
                <span>Czas trwania: {quiz.duration} min</span>
                <Divider type="vertical" />
                <span>Kategoria: {quiz.category}</span>
              </Space>
              <Button type="primary">Rozwiąż</Button>
            </Flex>
          </List.Item>
        )}
      ></List>
    );
};
export default QuizzesList;
