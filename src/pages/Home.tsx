import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { LOGIN_PATHNAME } from "../router/index";
import { Button } from "antd";

const Home: FC = () => {
  // 第三方Hook
  const nav = useNavigate();
  function clickHandler() {
    // nav(LOGIN_PATHNAME);
    nav({
      pathname: LOGIN_PATHNAME,
      search: "b=21",
    });
  }

  return (
    <div>
      <p>Home</p>
      <Button onClick={clickHandler}>登录</Button>
      &nbsp;
      <Link to="/register?a=10">注册</Link>
    </div>
  );
};

export default Home;
