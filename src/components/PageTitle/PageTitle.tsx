import { Typography } from "antd";

const { Title } = Typography;

const PageTitle = ({ children }: { children: string }) => {
  return (
    <Title
      level={2}
      style={{
        marginTop: 0,
      }}
    >
      {children}
    </Title>
  );
};

export default PageTitle;
