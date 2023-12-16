import { Button, Flex, Layout } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";
import { Link } from "react-router-dom";
import useSessionContext from "@/hooks/useSessionContext";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  const { logoutMutation, authData } = useSessionContext();

  const { isPending, mutate: logout } = logoutMutation;

  return (
    <Layout className={styles["main-layout"]}>
      <Sider className={styles["sider"]} width={350}>
        <Flex
          vertical
          gap="2.5rem"
          style={{
            height: "100%",
          }}
        >
          <Link to="/">QuizzesApp</Link>
          <Flex vertical gap={16}>
            <Link to="/quizzes-list">Lista quizów</Link>
            {authData ? (
              <Link to="/create-quiz">Stwórz quiz</Link>
            ) : (
              <>
                <Link to="/sign-in">Logowanie</Link>
                <Link to="/sign-up">Rejestracja</Link>
              </>
            )}
          </Flex>
          {authData ? (
            <Button
              type="primary"
              size="large"
              loading={isPending}
              onClick={() => logout()}
              style={{
                marginTop: "auto",
                width: "fit-content",
                alignSelf: "flex-end",
              }}
            >
              Wyloguj się
            </Button>
          ) : null}
        </Flex>
      </Sider>
      <Layout>
        <Header className={styles["header"]}>
          Breadcrumbs
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
