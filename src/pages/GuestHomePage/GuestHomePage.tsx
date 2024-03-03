import { Card, Button, Typography, Flex } from "antd";
import { Link } from "react-router-dom";

const { Title, Text } = Typography;

const GuestHomePage = () => {
  return (
    <Card bordered={false} style={{ width: "fit-content", minWidth: '400px' }}>
      <Title level={2} style={{ marginTop: 0 }}>
        Witaj w QuizzesApp
      </Title>
      <Flex vertical gap={16} style={{ marginBottom: "1em" }}>
        <Text>Posiadasz już konto?</Text>
        <Link to="sign-in">
          <Button type="primary">Zaloguj się</Button>
        </Link>
      </Flex>
      <Flex vertical gap={16}>
        <Text>Nie posiadasz?</Text>
        <Link to="sign-up">
          <Button type="primary">Stwórz je</Button>
        </Link>
      </Flex>
    </Card>
  );
};
export default GuestHomePage;
