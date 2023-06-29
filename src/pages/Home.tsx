import React, { FC } from "react";
import { useNavigate, Link } from "react-router-dom";

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
      <button onClick={clickHandler}>登录</button>
      <Link to="/register?a=10">注册</Link>
    </div>
  );
};

export default Home;
