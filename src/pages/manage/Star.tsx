import React, { FC } from "react";
import styles from "./common.module.scss";
import { Typography, Empty, Spin } from "antd";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import { useTitle } from "ahooks";
import useLoadQuestionListData from "../../hooks/useLoadQuestionListData";

const { Title } = Typography;

const Star: FC = () => {
  useTitle("小温问卷 - 星标问卷");

  const { data = {}, loading } = useLoadQuestionListData({ isStar: true });
  const { list = [], total = 0 } = data;
  return (
    <>
      <div className={styles.header}>
        <div className={styles.left}>
          <Title level={3}>星标问卷</Title>
        </div>
        <div className={styles.right}>
          <ListSearch />
        </div>
      </div>
      <div className={styles.content}>
        {loading && (
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        )}
        {!loading && list.length === 0 && <Empty description="暂无数据" />}
        {!loading &&
          list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>分页</div>
    </>
  );
};

export default Star;
