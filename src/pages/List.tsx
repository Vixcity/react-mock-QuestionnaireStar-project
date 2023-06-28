import React, { FC, useState } from "react";
import styles from "./QuestionCard.module.scss";
import QuestionCard from "../components/QuestionCard";

const List: FC = () => {
  const rawQuestionList = [
    {
      id: "q1",
      title: "问卷1",
      isPublished: false,
      isStar: false,
      answerCount: 5,
      createAt: "3月10日 13:23",
    },
    {
      id: "q2",
      title: "问卷2",
      isPublished: true,
      isStar: false,
      answerCount: 3,
      createAt: "3月11日 13:23",
    },
    {
      id: "q3",
      title: "问卷3",
      isPublished: false,
      isStar: true,
      answerCount: 6,
      createAt: "3月12日 13:23",
    },
    {
      id: "q4",
      title: "问卷4",
      isPublished: true,
      isStar: false,
      answerCount: 2,
      createAt: "3月15日 13:23",
    },
  ];

  const [questionList, setQuestionList] = useState(rawQuestionList);
  return (
    <>
      <p>List</p>
    </>
  );
};

export default List;
