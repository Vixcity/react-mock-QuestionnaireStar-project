import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "antd";

const Home: FC = () => {
  // 第三方Hook
  const nav = useNavigate();
  function clickHandler() {
    // nav("/login");
    nav({
      pathname: "/login",
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
