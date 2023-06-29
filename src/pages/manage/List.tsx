import React, { FC, useState } from "react";
import styles from "./List.module.scss";
import QuestionCard from "../../components/QuestionCard";

const List: FC = () => {
  const rawQuestionList = [
    {
      _id: "q1", // mongodb 数据库 中的 id 都是带下划线的，为了和数据库统一，所以采用 _id
      title: "问卷1",
      isPublished: false,
      isStar: false,
      answerCount: 5,
      createdAt: "3月10日 13:23",
    },
    {
      _id: "q2",
      title: "问卷2",
      isPublished: true,
      isStar: false,
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
    {
      _id: "q4",
      title: "问卷4",
      isPublished: true,
      isStar: false,
      answerCount: 2,
      createdAt: "3月15日 13:23",
    },
  ];

  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <h3>我的问卷</h3>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.map((q) => {
          const { _id } = q;
          return <QuestionCard key={_id} {...q} />;
        })}
      </div>
      <div className={styles.footer}>list page footer</div>
    </>
  );
};

export default List;
