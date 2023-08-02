import React, { FC, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button, Divider, Space, Tag, Popconfirm, Modal, message } from "antd";
import {
  EditOutlined,
  LineChartOutlined,
  StarOutlined,
  CopyOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import styles from "./QuestionCard.module.scss";
import { useRequest } from "ahooks";
import {
  duplicateQuestionService,
  updateQuestionService,
} from "../services/question";

const { confirm } = Modal;

type PropsType = {
  _id: string;
  title: string;
  isStar: boolean;
  isPublished: boolean;
  answerCount: number;
  createdAt: string;
};

const QuestionCard: FC<PropsType> = (props: PropsType) => {
  const nav = useNavigate();
  const { _id, title, isStar, isPublished, createdAt, answerCount } = props;

  // 复制
  const { loading: duplicateLoading, run: duplicate } = useRequest(
    async () => {
      await duplicateQuestionService(_id);
    },
    {
      manual: true,
      onSuccess(res: any) {
        message.success("复制成功");
        nav(`/question/edit/${res.id}`);
      },
    },
  );

  // 标星
  const [isStarState, setIsStarState] = useState(isStar);
  const { loading: changeStarLoading, run: changeStar } = useRequest(
    async () => await updateQuestionService(_id, { isStar: !isStarState }),
    {
      manual: true,
      onSuccess() {
        setIsStarState(!isStarState);
        message.success("已更新");
      },
    },
  );

  function del() {
    confirm({
      title: "确定删除该问卷?",
      icon: <ExclamationCircleOutlined />,
      onOk: () => deleteQuestion(),
    });
  }

  // 删除
  const [isDeletedState, setIsDeletedState] = useState(false);
  const { loading: deleteLoading, run: deleteQuestion } = useRequest(
    async () => await updateQuestionService(_id, { isDeleted: true }),
    {
      manual: true,
      onSuccess(res: any) {
        message.success("删除成功");
        setIsDeletedState(true);
      },
    },
  );
  // 已经删除的问卷不要在渲染卡片
  if (isDeletedState) return null;

  return (
    <div className={styles.container}>
      <div className={styles.title}>
        <div className={styles.left}>
          <Link
            to={isPublished ? `/question/stat/${_id}` : `/question/edit/${_id}`}
          >
            <Space>
              {isStarState && <StarOutlined style={{ color: "red" }} />}
              {title}
            </Space>
          </Link>
        </div>
        <div className={styles.right}>
          <Space>
            {isPublished ? (
              <Tag color="processing">已发布</Tag>
            ) : (
              <Tag>未发布</Tag>
            )}
            <span>答卷：{answerCount}</span>
            <span>{createdAt}</span>
          </Space>
        </div>
      </div>
      <Divider style={{ margin: "16px 0" }} />
      <div className={styles.buttonContainer}>
        <div className={styles.left}>
          <Space>
            <Button
              icon={<EditOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/edit/${_id}`)}
            >
              编辑问卷
            </Button>
            <Button
              icon={<LineChartOutlined />}
              type="text"
              size="small"
              onClick={() => nav(`/question/stat/${_id}`)}
              disabled={!isPublished}
            >
              问卷统计
            </Button>
          </Space>
        </div>
        <div className={styles.right}>
          <Space>
            <Button
              icon={<StarOutlined />}
              type="text"
              size="small"
              onClick={changeStar}
              loading={changeStarLoading}
            >
              {isStarState ? "取消标星" : "标星"}
            </Button>
            <Popconfirm
              title="确认复该问卷?"
              okText="确定"
              cancelText="取消"
              onConfirm={duplicate}
            >
              <Button
                icon={<CopyOutlined />}
                type="text"
                size="small"
                loading={duplicateLoading}
              >
                复制
              </Button>
            </Popconfirm>
            <Button
              icon={<DeleteOutlined />}
              type="text"
              size="small"
              onClick={del}
              loading={deleteLoading}
            >
              删除
            </Button>
          </Space>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;
