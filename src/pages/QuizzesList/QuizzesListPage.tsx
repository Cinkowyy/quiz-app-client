import { Typography } from "antd";
import QuizzesList from "@features/QuizzesList/QuizzesList";

const { Title } = Typography;

const QuizzesListPage = () => {
  return (
    <>
      <Title
        level={2}
        style={{
          marginTop: 0,
        }}
      >
        Lista quizów
      </Title>
      <QuizzesList />
    </>
  );
};
export default QuizzesListPage;
