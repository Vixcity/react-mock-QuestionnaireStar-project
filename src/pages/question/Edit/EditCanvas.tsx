import React, { FC } from "react";
import styles from "./EditCanvas.module.scss";

// 临时展示一下title和input效果
import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Components";
import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Components";

const EditCanvas: FC = () => {
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
