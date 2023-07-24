import React, { FC, useEffect, useState } from "react";
import styles from "./common.module.scss";
import { Spin, Typography } from "antd";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import { useDebounceFn, useTitle } from "ahooks";
import { useSearchParams } from "react-router-dom";

const { Title } = Typography;

const List: FC = () => {
  useTitle("小温问卷 - 我的问卷");

  const [page, setPage] = useState(1); // List 的内部数据，不在 Url 当中体现
  const [list, setList] = useState([]); // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0);
  const haveModeData = total > list.length; // 是否有更多的未加载数据
  const [searchParams] = useSearchParams(); // url 参数，虽然没有 page 和 pageSize 但是有 keyword

  // 触发加载的函数，且防抖
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      console.log("tryLoadMore...");
    },
    {
      wait: 1000,
    },
  );

  // 页面加载或者 keyword 变化时触发加载
  useEffect(() => {
    tryLoadMore();
  }, [searchParams]);

  // 当页面滚动时，尝试触发加载
  useEffect(() => {
    // if (haveModeData) {
    window.addEventListener("scroll", tryLoadMore); // 考虑防抖
    // }

    return () => {
      // 变量修改后，导致的重新render，会先执行 useEffect 中的 return，再执行useEffect内除了return部分代码。
      // return 内的回调，可以用来清理遗留垃圾，比如订阅或计时器 ID 等占用资源的东西。
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams]);

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
        {
          <div style={{ textAlign: "center" }}>
            <Spin />
          </div>
        }
        {/* 问卷列表 */}
        <div style={{ height: "2000px" }}></div>
        {list.length > 0 &&
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>loadMore…上划加载更多…</div>
    </>
  );
};

export default List;
