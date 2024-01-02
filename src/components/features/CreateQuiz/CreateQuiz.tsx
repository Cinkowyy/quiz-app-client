import { useState } from "react";
import { QuizFormDataType, QuestionFormDataType, QuestionType } from "./types";
import { App, Button, Card, Divider, Flex, Typography } from "antd";
import CreateQuizForm from "./components/CreateQuizForm/CreateQuizForm";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import QuestionFormModal from "./components/QuestionFormModal/QuestionFormModal";

const { Text } = Typography;

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [questionToEdit, setQuestionToEdit] = useState<QuestionType | null>(
    null
  );

  const { message } = App.useApp();

  const addQuestion = (question: QuestionFormDataType) => {
    console.log(question);
    
    setQuestions((prevQuestions) => [
      ...prevQuestions,
      {
        id: Date.now(),
        ...question,
      },
    ]);
  };

  const editQuestion = (updatedQuestionData: QuestionFormDataType) => {
    if (!questionToEdit) return;
    const questionId = questionToEdit.id;

    setQuestions((prevQuestions) =>
      prevQuestions.map((question) =>
        question.id === questionId
          ? { id: questionId, ...updatedQuestionData }
          : question
      )
    );
    setQuestionToEdit(null);
  };

  const openEditMode = (questionId: number) => {
    const questionToEdit = questions.filter((q) => q.id === questionId)[0];
    setQuestionToEdit(questionToEdit);
    openModal();
  };

  const removeQuestion = (questionId: number) => {
    setQuestions((prev) => prev.filter((q) => q.id != questionId));
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setQuestionToEdit(null);
  };

  const onFormSubmit = (values: QuizFormDataType) => {
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
      <Button type="primary" size="middle" onClick={openModal}>
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
            editQuestion={openEditMode}
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
        onSubmit={questionToEdit ? editQuestion : addQuestion}
        dataToEdit={questionToEdit}
      />
    </>
  );
};
export default CreateQuiz;
