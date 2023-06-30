import React, { FC, useState } from "react";
import styles from "./common.module.scss";
import { Typography, Empty } from "antd";
import QuestionCard from "../../components/QuestionCard";
import { useTitle } from "ahooks";
// import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

const rawQuestionList = [
  {
    _id: "q1", // mongodb 数据库 中的 id 都是带下划线的，为了和数据库统一，所以采用 _id
    title: "问卷1",
    isPublished: false,
    isStar: true,
    answerCount: 5,
    createdAt: "3月10日 13:23",
  },
  {
    _id: "q2",
    title: "问卷2",
    isPublished: true,
    isStar: true,
    answerCount: 3,
    createdAt: "3月11日 13:23",
  },
  {
    _id: "q3",
    title: "问卷3",
    isPublished: false,
    isStar: true,
    answerCount: 6,
    createdAt: "3月12日 13:23",
  },
];

const Star: FC = () => {
  useTitle("小温问卷 - 星标问卷");

  const [questionList, setQuestionList] = useState(rawQuestionList);

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
