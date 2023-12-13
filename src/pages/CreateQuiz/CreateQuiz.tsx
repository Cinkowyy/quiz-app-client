import { Button, Card, Divider, Flex, List, Space } from "antd";
import CreateQuizForm from "../../components/features/CreateQuizForm/CreateQuizForm";
import { useState } from "react";
import AddQuestionModal from "../../components/features/AddQuestionModal/AddQuestionModal";
import { z } from "zod";

export const QuestionValidationSchema = z.object({
  content: z
    .string({
      required_error: "Treść jest wymagana",
    })
    .min(1, {
      message: "Treść jest wymagana",
    }),
  type: z.enum(["single", "mutli"]),
});

export type QuestionDataType = z.infer<typeof QuestionValidationSchema>;

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<QuestionDataType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addQuestion = (question: QuestionDataType) => {
    setQuestions((prev) => [...prev, question]);
  };

  const handleSetIsOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  return (
    <Flex gap={32}>
      <Card title="Stwórz quiz" style={{ width: 400 }} bordered={false}>
        <CreateQuizForm questions={questions} />
      </Card>

      <Card
        title={
          <Flex align="center" justify="space-between">
            Pytania
            <Button type="primary" onClick={() => setIsOpen(true)}>
              Dodaj
            </Button>
          </Flex>
        }
        style={{ minWidth: 400 }}
        bordered={false}
      >
        <List
          size="large"
          locale={{ emptyText: "Brak pytań" }}
          dataSource={questions}
          renderItem={(question) => (
            <List.Item style={{ paddingInline: 0 }}>
              <Space>
                <span>Treść: {question.content}</span>
                <Divider type="vertical" />
                <span>Typ: {question.type}</span>
              </Space>
            </List.Item>
          )}
        ></List>
      </Card>
      <AddQuestionModal
        isOpen={isOpen}
        setIsOpen={handleSetIsOpen}
        addQuestion={addQuestion}
      />
    </Flex>
  );
};
export default CreateQuiz;
