import { Flex, Layout } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import { Link } from "react-router-dom";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  return (
    <Layout className={styles["main-layout"]}>
      <Sider className={styles["sider"]} width={350}>
        <Flex vertical gap={16}>
          <Link to="/sign-up">Rejestracja</Link>
          <Link to="/sign-in">Logowanie</Link>
          <Link to="/quizzes-list">Lista quizów</Link>
        </Flex>
      </Sider>
      <Layout>
        <Header className={styles["header"]}>
          <Link to="/">QuizzesApp</Link>
        </Header>
        <Content className={styles["content"]}>
          <Outlet />
        </Content>
        <Footer className={styles["footer"]}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
