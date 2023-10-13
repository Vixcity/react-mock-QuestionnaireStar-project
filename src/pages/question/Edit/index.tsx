import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import EditCanvas from "./EditCanvas";
import { useDispatch } from "react-redux";
import { changeSelectId } from "../../../store/componentReducer";

const Edit: FC = () => {
  const { loading } = useLoadQuestionData();
  const dispatch = useDispatch();

  function clearSelectId() {
    dispatch(changeSelectId(""));
  }

  return (
    <div className={styles.container}>
      <div style={{ background: "#fff", height: "40px" }}>Header</div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>Left</div>
          <div className={styles.main} onClick={clearSelectId}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>Right</div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
