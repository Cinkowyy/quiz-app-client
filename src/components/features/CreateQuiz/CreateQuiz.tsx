import { useState } from "react";
import { QuestionDataType } from "./types";
import { Button, Card, Divider, Flex, List, Space } from "antd";
import CreateQuizForm from "./components/CreateQuizForm/CreateQuizForm";
import AddQuestionModal from "./components/AddQuestionModal/AddQuestionModal";

const CreateQuiz = () => {
  const [questions, setQuestions] = useState<QuestionDataType[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addQuestion = (question: QuestionDataType) => {
    setQuestions((prev) => [...prev, question]);
  };

  const handleSetIsOpen = (isOpen: boolean) => {
    setIsOpen(isOpen);
  };

  const QuestionsListTitle = (
    <Flex align="center" justify="space-between">
      Pytania
      <Button type="primary" onClick={() => setIsOpen(true)}>
        Dodaj
      </Button>
    </Flex>
  );

  return (
    <Flex gap={32}>
      <Card title="Stwórz quiz" style={{ width: 400 }} bordered={false}>
        <CreateQuizForm questions={questions} />
      </Card>

      <Card
        title={QuestionsListTitle}
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
