import React, { FC } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";
import { Button, message } from "antd";
import { UserOutlined } from "@ant-design/icons";
import { useRequest } from "ahooks";
import { getUserInfoServices } from "../services/user";
import { removeToken } from "../utils/user-token";
// import styles from "./UserInfo.module.scss";

const UserInfo: FC = () => {
  const nav = useNavigate();

  const { data } = useRequest(getUserInfoServices);
  const { username, nickname } = data || {};

  function loginOut() {
    removeToken(); // 清除 Token 的存储
    message.success("退出成功");
    nav(LOGIN_PATHNAME);
  }

  const UserInfo = (
    <>
      <span style={{ color: "#e8e8e8" }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={loginOut}>
        退出
      </Button>
    </>
  );

  const Login = <Link to={LOGIN_PATHNAME}>登录</Link>;

  return <div>{username ? UserInfo : Login}</div>;
};

export default UserInfo;
