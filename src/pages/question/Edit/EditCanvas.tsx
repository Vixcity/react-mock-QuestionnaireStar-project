import React, { FC } from "react";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import styles from "./EditCanvas.module.scss";

// 临时展示一下title和input效果
import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Components";
import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Components";

type PropsType = {
  loading: boolean;
};

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      <div>
        <div className={styles["component-wrapper"]}>
          <div className={styles.component}>
            <QuestionTitle />
          </div>
        </div>
        <div className={styles["component-wrapper"]}>
          <div className={styles.component}>
            <QuestionInput />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCanvas;
