import { Avatar, Button, Card, Flex, Typography } from "antd";
import {
  UserOutlined,
  ClockCircleOutlined,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import { QuizType } from "../types";
import { Link } from "react-router-dom";

const { Text, Title } = Typography;
const QuizCard = ({ quiz }: { quiz: QuizType }) => {
  return (
    <Card
      bordered={false}
      title={
        <Flex gap="0.5rem" align="center">
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{quiz.author.nickname}</Text>
        </Flex>
      }
    >
      <Flex vertical>
        <Title
          level={5}
          style={{
            margin: "0 0 0.5rem",
          }}
        >
          {quiz.title}
        </Title>
        <Text
          style={{
            marginBottom: "1rem",
          }}
        >
          Kategoria: {quiz.category}
        </Text>

        <Flex align="center" justify="space-between" gap="1rem">
          <Flex gap={"0.5rem"} align="center">
            <Text type="secondary">
              <ClockCircleOutlined />
            </Text>
            <Text type="secondary">{quiz.duration} minut</Text>
          </Flex>

          <Flex gap={"0.5rem"} align="center">
            <Text type="secondary">
              <QuestionCircleOutlined />
            </Text>
            <Text type="secondary">{quiz.questionsCount} pytań</Text>
          </Flex>
        </Flex>
      </Flex>
      <Link to={"/quiz/" + quiz.id}>
        <Button
          size="middle"
          style={{
            width: "100%",
            marginTop: "1rem",
          }}
          type="primary"
        >
          Uruchom quiz
        </Button>
      </Link>
    </Card>
  );
};

export default QuizCard;
