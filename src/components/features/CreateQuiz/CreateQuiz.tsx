import { useState } from "react";
import { QuestionDataType } from "./types";
import { Button, Card, Divider, Flex, List, Space, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import CreateQuizForm from "./components/CreateQuizForm/CreateQuizForm";
import AddQuestionModal from "./components/AddQuestionModal/AddQuestionModal";

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

          <List
            size="large"
            style={{
              minWidth: 350,
            }}
            locale={{ emptyText: "Brak pytań" }}
            dataSource={questions}
            renderItem={(question) => (
              <List.Item style={{ paddingInline: 0 }}>
                <Flex
                  align="center"
                  justify="space-between"
                  gap="1rem"
                  style={{
                    width: "100%",
                  }}
                >
                  <Space>
                    <span>Treść: {question.content}</span>
                    <Divider type="vertical" />
                    <span>Typ: {question.type}</span>
                  </Space>
                  <Space>
                    <Button
                      type="primary"
                      size="small"
                      icon={<EditOutlined />}
                    />
                    <Button
                      type="primary"
                      danger
                      size="small"
                      onClick={() => removeQuestion(question)}
                      icon={<DeleteOutlined />}
                    />
                  </Space>
                </Flex>
              </List.Item>
            )}
          ></List>
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
