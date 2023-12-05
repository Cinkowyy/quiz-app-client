import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import styles from "./MainLayout.module.scss";

const { Header, Content, Footer, Sider } = Layout;

const MainLayout = () => {
  return (
    <Layout className={styles["main-layout"]}>
      <Sider className={styles["sider"]} width={350}>Sider Menu</Sider>
      <Layout>
        <Header className={styles["header"]}>Header</Header>
        <Content className={styles["content"]}>
          <Outlet />
        </Content>
        <Footer className={styles["footer"]}>Footer</Footer>
      </Layout>
    </Layout>
  );
};

export default MainLayout;
