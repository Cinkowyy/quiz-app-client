import CreateQuiz from "@features/CreateQuiz/CreateQuiz";
import { Typography } from "antd";

const { Title } = Typography;

const CreateQuizPage = () => {
  return (
    <>
      <Title
        level={2}
        style={{
          marginTop: 0,
        }}
      >
        Nowy Quiz
      </Title>
      <CreateQuiz />
    </>
  );
};
export default CreateQuizPage;
