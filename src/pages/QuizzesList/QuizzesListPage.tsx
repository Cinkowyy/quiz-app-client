import { Card } from "antd";
import QuizzesList from "../../components/features/QuizzesList/QuizzesList";

const QuizzesListPage = () => {

  return (
    <Card title="Lista quizów" bordered={false}>
      <QuizzesList />
    </Card>
  );
};
export default QuizzesListPage;
