import { useState } from "react";
import { QuestionDataType } from "./types";
import { App, Button, Card, Divider, Flex, Typography } from "antd";
import CreateQuizForm from "./components/CreateQuizForm/CreateQuizForm";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import QuestionFormModal from "./components/QuestionFormModal/QuestionFormModal";
import { QuizDataType } from "./components/CreateQuizForm/types";

const { Text } = Typography;

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<QuestionDataType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const { message } = App.useApp();

  const addQuestion = (question: QuestionDataType) => {
    setQuestions((prev) => [...prev, question]);
  };

  const removeQuestion = (question: QuestionDataType) => {
    setQuestions((prev) => prev.filter((q) => q != question));
  };

  const closeModal = () => setIsOpen(false);

  const onFormSubmit = (values: QuizDataType) => {
    if (questions.length < 5) {
      message.error({
        content: "Quiz musi mieć przynajmniej 5 pytań",
        duration: 5,
      });
      return;
    }
    console.log(values);
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
          <CreateQuizForm onFormSubmit={onFormSubmit} />

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
      <QuestionFormModal
        isOpen={isOpen}
        closeModal={closeModal}
        addQuestion={addQuestion}
      />
    </>
  );
};
export default CreateQuiz;
