import { useState } from "react";
import { QuestionFormDataType, QuizFormDataType } from "./types";
import {
  App,
  Button,
  Card,
  Divider,
  Flex,
  Form,
  FormInstance,
  Typography,
} from "antd";
import CreateQuizForm from "./components/CreateQuizForm/CreateQuizForm";
import QuestionsList from "./components/QuestionsList/QuestionsList";
import QuestionFormModal from "./components/QuestionFormModal/QuestionFormModal";
import useQuizQuestions from "./useQuizQuestions";

const { Text } = Typography;

const CreateQuiz = () => {
  const [isOpen, setIsOpen] = useState(false);

  const {
    questions,
    questionToEdit,
    addQuestion,
    editQuestion,
    setQuestionToEdit,
    removeQuestion,
  } = useQuizQuestions();

  const { message } = App.useApp();

  const openEditMode = (questionId: number) => {
    const questionToEdit = questions.filter((q) => q.id === questionId)[0];
    setQuestionToEdit(questionToEdit);
    openModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setQuestionToEdit(null);
  };

  type FormNames = "quizForm" | "questionForm";

  type QuizForms = {
    quizForm: FormInstance<QuizFormDataType>;
    questionForm: FormInstance<QuestionFormDataType>;
  };

  type QuizValues = QuizFormDataType | QuestionFormDataType;

  type OnFormFinish = (
    name: FormNames,
    info: {
      values: QuizValues;
      forms: QuizForms;
    }
  ) => void;

  const handleFormFinish: OnFormFinish = (name, { values, forms }) => {
    if (name === "quizForm") {
      console.log("Obsługa quizForm");
      if (questions.length < 5) {
        message.error({
          content: "Quiz musi mieć przynajmniej 5 pytań",
          duration: 5,
        });
        return;
      }
      console.log({
        ...values,
        questions,
      });
    } else {
      console.log("Obsługa questionForm:");
      const { questionForm } = forms;

      if (questionToEdit) editQuestion(values as QuestionFormDataType);
      else addQuestion(values as QuestionFormDataType);
      questionForm.resetFields();
      closeModal();
    }
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
    <Form.Provider
      onFormFinish={(name, { values, forms }) =>
        handleFormFinish(
          name as FormNames,
          { values, forms } as { values: QuizValues; forms: QuizForms }
        )
      }
    >
      <Card
        title={CardTitle}
        style={{ height: "fit-content", width: "fit-content" }}
        bordered={false}
      >
        <Flex gap="1rem">
          <CreateQuizForm />

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
          form="quizForm"
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
        dataToEdit={questionToEdit}
      />
    </Form.Provider>
  );
};
export default CreateQuiz;
