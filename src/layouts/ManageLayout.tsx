import React, { FC } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  PlusOutlined,
  BarsOutlined,
  StarOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { Button, Space, Divider } from "antd";
import styles from "./ManageLayout.module.scss";

const ManageLayout: FC = () => {
  const nav = useNavigate();
  const { pathname } = useLocation();
  console.log("pathname", pathname);

  return (
    <div className={styles.container}>
      <div className={styles.left}>
        <p>ManageLayout header</p>
        <Space direction="vertical">
          <Button type="primary" size="large" icon={<PlusOutlined />}>
            新建问卷
          </Button>
          <Divider style={{ borderTop: "transparent" }} />
          <Button
            type={pathname.startsWith("/manage/list") ? "default" : "text"}
            onClick={() => nav("/manage/list")}
            size="large"
            icon={<BarsOutlined />}
          >
            我的问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/star") ? "default" : "text"}
            onClick={() => nav("/manage/star")}
            size="large"
            icon={<StarOutlined />}
          >
            星标问卷
          </Button>
          <Button
            type={pathname.startsWith("/manage/trash") ? "default" : "text"}
            onClick={() => nav("/manage/trash")}
            size="large"
            icon={<DeleteOutlined />}
          >
            回收站
          </Button>
        </Space>
      </div>
      <div className={styles.right}>
        <Outlet />
      </div>
    </div>
  );
};

export default ManageLayout;
