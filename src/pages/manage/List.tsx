import React, { FC, useState } from "react";
import styles from "./common.module.scss";
import { Typography } from "antd";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import { useTitle } from "ahooks";

// import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

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

const List: FC = () => {
  useTitle("小温问卷 - 我的问卷");
  // const [searchParams] = useSearchParams();
  // console.log("keyword:", searchParams.get("keyword"));

  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>我的问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {/* 问卷列表 */}
        {questionList.length > 0 &&
          questionList.map((q) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore…上划加载更多…</div>
    </>
  );
  
};

export default List;
