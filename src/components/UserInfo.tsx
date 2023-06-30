import React, { FC } from "react";
import { Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";
// import styles from "./UserInfo.module.scss";

const UserInfo: FC = () => {
  // 对于已经登录的用户，显示什么？后面在做

  return (
    <>
      <Link to={LOGIN_PATHNAME}>登录</Link>
    </>
  );
};

export default UserInfo;
