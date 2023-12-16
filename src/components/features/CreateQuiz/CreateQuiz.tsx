import { useState } from "react";
import { QuestionDataType } from "./types";
import { Button, Card, Divider, Flex, Typography } from "antd";
import CreateQuizForm from "./components/CreateQuizForm/CreateQuizForm";
import AddQuestionModal from "./components/AddQuestionModal/AddQuestionModal";
import QuestionsList from "./components/QuestionsList/QuestionsList";

const { Text } = Typography;

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<QuestionDataType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addQuestion = (question: QuestionDataType) => {
    setQuestions((prev) => [...prev, question]);
  };

  const removeQuestion = (question: QuestionDataType) => {
    setQuestions((prev) => prev.filter((q) => q != question));
  };

  const handleSetIsOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const CardTitle = (
    <Flex align="center" justify="space-between">
      <Text>Ustawienia</Text>
      <Button type="primary" size="middle" onClick={() => setIsOpen(true)}>
        Dodaj pytanie
      </Button>
    </Flex>
  );

  return (
    <>
      <Card
        title={CardTitle}
        style={{ height: "fit-content", width: "fit-content" }}
        bordered={false}
      >
        <Flex gap="1rem">
          <CreateQuizForm questions={questions} />

          <Divider
            type="vertical"
            style={{
              height: "auto",
            }}
          />

          <QuestionsList
            questions={questions}
            removeQuestion={removeQuestion}
          />
        </Flex>
        <Button
          type="primary"
          size="large"
          htmlType="submit"
          form="createQuizForm"
          style={{
            marginLeft: "auto",
            display: "block",
          }}
        >
          Dodaj quiz
        </Button>
      </Card>
      <AddQuestionModal
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
        addQuestion={addQuestion}
      />
    </>
  );
};
export default CreateQuiz;
