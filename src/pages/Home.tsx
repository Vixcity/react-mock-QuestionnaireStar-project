import React, { FC, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Typography } from "antd";
import { MANAGE_INDEX_PATHNAME } from "../router/index";
import styles from "./Home.module.scss";

import axios from "axios";
// import "../_mock/index";

const { Title, Paragraph } = Typography;

const Home: FC = () => {
  // 第三方Hook
  const nav = useNavigate();

  useEffect(() => {
    axios.get("/api/test").then((res) => {
      console.log("axios data",res.data);
    });
    // mockjs 只能劫持 XMLHttpRequest 不能劫持 fetch
    // 生产环境下也要注释掉，否则线上也会被劫持
    // 不推荐直接在项目中直接使用 Mockjs
    // fetch("/api/test")
    //   .then((res) => res.json())
    //   .then((data) => console.log("fetch data", data));
  }, []);

  //   function clickHandler() {
  //     // nav(LOGIN_PATHNAME);
  //     nav({
  //       pathname: LOGIN_PATHNAME,
  //       search: "b=21",
  //     });
  //   }

  return (
    <div className={styles.container}>
      <div className={styles.info}>
        <Title>问卷调查 | 在线投票</Title>
        <Paragraph>
          已累计创建问卷 100 份，发布问卷 90 份，收到答卷 980 份
        </Paragraph>
        <div>
          <Button type="primary" onClick={() => nav(MANAGE_INDEX_PATHNAME)}>
            开始使用
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
