import PageTitle from "@/components/PageTitle/PageTitle";
import SolveQuiz from "@/components/features/SolveQuiz/SolveQuiz";
import { useParams } from "react-router-dom";

const SolveQuizPage = () => {
  const { quizId } = useParams();
  return (
    <>
      <PageTitle>Rozwiąż quiz</PageTitle>
      {quizId ? <SolveQuiz quizId={quizId} /> : null}
    </>
  );
};
export default SolveQuizPage;
