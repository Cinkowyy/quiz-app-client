import { useState } from "react";
import {
  OnFormFinish,
  QuestionFormDataType,
  QuestionType,
  QuizFormDataType,
} from "./types";
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
import { useMutation } from "@tanstack/react-query";
import axios from "@/api/axios";
import useSessionContext from "@/hooks/useSessionContext";

const { Text } = Typography;

const CreateQuiz = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [form] = Form.useForm<QuizFormDataType>();
  const questions = Form.useWatch("questions", form);

  const { message } = App.useApp();

  const { authData } = useSessionContext();

  const {
    questionToEdit,
    addQuestion,
    editQuestion,
    setQuestionToEdit,
    removeQuestion,
  } = useQuizQuestions(form);

  const openEditMode = (questionId: number) => {
    const questions: QuestionType[] = form.getFieldValue("questions");
    const questionToEdit = questions.filter((q) => q.id === questionId)[0];
    setQuestionToEdit(questionToEdit);
    openModal();
  };

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setQuestionToEdit(null);
  };

  const { mutate: createQuiz } = useMutation({
    mutationFn: async (quizData: QuizFormDataType) =>
      await axios.post(
        "/quizzes/createQuiz",
        { ...quizData, categoryId: quizData.category },
        {
          headers: {
            Authorization: "Bearer " + authData?.accessToken,
          },
        }
      ),
    onError: (error) => console.log(error),
    onSuccess: () => {
      form.resetFields()
      message.success({
        content: "Quiz został dodany",
        duration: 5,
      });
    },
  });

  const handleQuizSubmit = ({
    values,
    form,
  }: {
    values: QuizFormDataType;
    form: FormInstance<QuizFormDataType>;
  }) => {
    if (values.questions.length < 5) {
      message.error({
        content: "Quiz musi mieć przynajmniej 5 pytań",
        duration: 5,
      });
      return;
    }
    console.log(values);
    createQuiz(values);
  };

  const handleQuestionSubmit = ({
    values,
    form,
  }: {
    values: QuestionFormDataType;
    form: FormInstance<QuestionFormDataType>;
  }) => {
    const correctCount = values.answers.filter(
      (answer) => answer?.isCorrect
    ).length;
    let error = null;
    if (values.type == "single" && correctCount != 1)
      error = "Jedna z odpowiedzi musi być zaznaczona";
    else if (values.type == "multi" && correctCount < 2)
      error = "Co najmniej 2 odpowiedzi muszą być zaznaczone";

    if (error) {
      form.setFields([
        {
          name: "answers",
          errors: [error],
        },
      ]);
      return;
    }

    if (questionToEdit) editQuestion(values);
    else addQuestion(values);
    form.resetFields();
    closeModal();
  };

  const handleFormFinish: OnFormFinish = ({ name, values, forms }) => {
    if (name === "quizForm")
      handleQuizSubmit({
        values,
        form: forms.quizForm,
      });
    else
      handleQuestionSubmit({
        values,
        form: forms.questionForm,
      });
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
        handleFormFinish({
          name,
          values,
          forms,
        } as never)
      }
    >
      <Card
        title={CardTitle}
        style={{ height: "fit-content", width: "fit-content" }}
        bordered={false}
      >
        <Flex gap="1rem">
          <CreateQuizForm form={form} />

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
