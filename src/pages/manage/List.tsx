import React, { FC, useEffect, useState, useRef } from "react";
import styles from "./common.module.scss";
import { Empty, Spin, Typography } from "antd";
import QuestionCard from "../../components/QuestionCard";
import ListSearch from "../../components/ListSearch";
import { useDebounceFn, useRequest, useTitle } from "ahooks";
import { useSearchParams } from "react-router-dom";
import { getQuestionListService } from "../../services/question";
import { LIST_PAGE_SIZE, LIST_SEARCH_PARAM_KEY } from "../../constant";

const { Title } = Typography;

const List: FC = () => {
  useTitle("小温问卷 - 我的问卷");

  const [started, setStarted] = useState(false); // 标记是否已经开始加载
  const [page, setPage] = useState(1); // List 的内部数据，不在 Url 当中体现
  const [list, setList] = useState([]); // 全部的列表数据，上划加载更多，累计
  const [total, setTotal] = useState(0);
  const haveModeData = total > list.length; // 是否有更多的未加载数据
  const [searchParams] = useSearchParams(); // url 参数，虽然没有 page 和 pageSize 但是有 keyword
  const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";

  // keyword 变化时重置信息
  useEffect(() => {
    setStarted(false);
    setPage(1);
    setList([]);
    setTotal(0);
  }, [keyword]);

  // 真正加载
  const { run: load, loading } = useRequest(
    async () => {
      const data = await getQuestionListService({
        page,
        pageSize: LIST_PAGE_SIZE,
        keyword,
      });

      return data;
    },
    {
      manual: true,
      onSuccess(result) {
        const { list: l = [], total = 0 } = result;
        setList(list.concat(l));
        setTotal(total);
        setPage(page + 1);
      },
    },
  );

  // LoadMore Elem
  const loadMoreContentElem = () => {
    if (!started || loading) return <Spin />;
    if (total === 0) return <Empty description="暂无数据" />;
    if (!haveModeData) return <span>没有更多了...</span>;
    return <span>开始加载下一页</span>;
  };

  // 触发加载的函数，且防抖
  const containerRef = useRef<HTMLDivElement>(null);
  const { run: tryLoadMore } = useDebounceFn(
    () => {
      const elem = containerRef.current;
      if (elem === null) return;

      const domRect = elem.getBoundingClientRect();
      if (domRect === null) return;

      const { bottom } = domRect;
      if (bottom <= window.innerHeight) {
        load();
        setStarted(true);
      }
    },
    {
      wait: 1000,
    },
  );

  // 页面加载或者 keyword 变化时触发加载
  useEffect(() => {
    // 初始化
    tryLoadMore();
  }, [searchParams]);

  // 当页面滚动时，尝试触发加载
  useEffect(() => {
    if (haveModeData) {
      window.addEventListener("scroll", tryLoadMore); // 考虑防抖
    }

    return () => {
      // 变量修改后，导致的重新render，会先执行 useEffect 中的 return，再执行useEffect内除了return部分代码。
      // return 内的回调，可以用来清理遗留垃圾，比如订阅或计时器 ID 等占用资源的东西。
      window.removeEventListener("scroll", tryLoadMore);
    };
  }, [searchParams, haveModeData]);

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
        {/* <div style={{ height: "2000px" }}></div> */}
        {list.length > 0 &&
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          list.map((q: any) => {
            const { _id } = q;
            return <QuestionCard key={_id} {...q} />;
          })}
      </div>
      <div className={styles.footer}>
        <div ref={containerRef}>{loadMoreContentElem()}</div>
      </div>
    </>
  );
};

export default List;
