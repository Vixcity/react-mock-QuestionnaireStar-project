import React, { FC, useState } from "react";
import { Typography, Empty, Table, Tag, Button, Space, Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import styles from "./common.module.scss";
import { useTitle } from "ahooks";
import ListSearch from "../../components/ListSearch";

const { Title } = Typography;
const { confirm } = Modal;

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
  // 记录选中的id
  const [selectIds, setSelectIds] = useState<string[]>([]);

  function del() {
    confirm({
      title: "确认彻底删除该问卷?",
      icon: <ExclamationCircleOutlined />,
      content: "删除以后不可以找回",
      onOk: () => alert(`删除${JSON.stringify(selectIds)}`),
    });
  }

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

  // 可以把JSX片段定义成一个变量
  const TableElement = (
    <>
      <div style={{ marginBottom: "16px" }}>
        <Space>
          <Button type="primary" disabled={selectIds.length === 0}>
            恢复
          </Button>
          <Button danger disabled={selectIds.length === 0} onClick={del}>
            彻底删除
          </Button>
        </Space>
      </div>
      <Table
        dataSource={questionList}
        columns={tableColumns}
        pagination={false}
        rowKey={(q) => q._id}
        rowSelection={{
          type: "checkbox",
          onChange: (selectedRowKeys, selectedRows, info) => {
            setSelectIds(selectedRowKeys as string[]);
            console.log(selectedRows, info);
          },
        }}
      />
    </>
  );

  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>回收站</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {questionList.length === 0 && <Empty description="暂无数据" />}
        {questionList.length > 0 && TableElement}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Trash;
