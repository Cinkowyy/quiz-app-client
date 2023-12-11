import { Card } from "antd";
import QuizzesList from "../../components/features/QuizzesList/QuizzesList";

const QuizzesListPage = () => {

  return (
    <Card>
      <h2>Lista quizów</h2>
      <QuizzesList />
    </Card>
  );
};
export default QuizzesListPage;
