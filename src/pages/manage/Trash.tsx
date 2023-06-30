import React, { FC, useState } from "react";
import { Typography, Empty, Table, Tag } from "antd";
import styles from "./common.module.scss";
import { useTitle } from "ahooks";

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

const Trash: FC = () => {
  useTitle("小温问卷 - 回收站");

  const [questionList, setQuestionList] = useState(rawQuestionList);
  const tableColumns = [
    {
      title: "标题",
      dataIndex: "title",
    },
    {
      title: "是否发布",
      dataIndex: "isPublished",
      render: (isPublished: boolean) => {
        return isPublished ? (
          <Tag color="processing">已发布</Tag>
        ) : (
          <Tag>未发布</Tag>
        );
      },
    },
    {
      title: "答卷数量",
      dataIndex: "answerCount",
    },
    {
      title: "创建时间",
      dataIndex: "createdAt",
    },
  ];

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>搜索</div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && (
          <Table
            dataSource={questionList}
            columns={tableColumns}
            pagination={false}
          />
        )}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Trash;
