import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Layout } from "antd";
import Logo from "../components/Logo";
import styles from "./MainLayout.module.scss";

const { Header, Content, Footer } = Layout;

const MainLayout: FC = () => {
  return (
    <Layout>
      <Header className={styles.header}>
        <div className={styles.left}>
          <Logo />
        </div>
        <div className={styles.right}>登录/用户信息</div>
      </Header>
      <Content className={styles.main}>
        <Outlet />
      </Content>
      <Footer className={styles.footer}>
        小温问卷 &copy; 2023 - present. Created by Vixcity
      </Footer>
    </Layout>
  );
};

export default MainLayout;
