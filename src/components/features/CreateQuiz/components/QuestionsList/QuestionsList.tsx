import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Button, Divider, Flex, List, Space } from "antd";
import { QuestionType } from "../../types";

type ListProps = {
  questions: QuestionType[];
  removeQuestion: (id: number) => void;
};

const QuestionsList = ({ questions, removeQuestion }: ListProps) => {
  return (
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
              <Button type="primary" size="small" icon={<EditOutlined />} />
              <Button
                type="primary"
                danger
                size="small"
                onClick={() => removeQuestion(question.id)}
                icon={<DeleteOutlined />}
              />
            </Space>
          </Flex>
        </List.Item>
      )}
    ></List>
  );
};

export default QuestionsList;
