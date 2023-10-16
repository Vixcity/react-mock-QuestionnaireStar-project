import React, { FC } from "react";
import useLoadQuestionData from "../../../hooks/useLoadQuestionData";
import styles from "./index.module.scss";
import LeftPanel from "./LeftPanel";
import RightPanel from "./RightPanel";
import EditCanvas from "./EditCanvas";
import EditHeader from "./EditHeader";
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
      <div style={{ background: "#fff", height: "40px" }}>
        <EditHeader />
      </div>
      <div className={styles["content-wrapper"]}>
        <div className={styles.content}>
          <div className={styles.left}>
            <LeftPanel />
          </div>
          <div className={styles.main} onClick={clearSelectId}>
            <div className={styles["canvas-wrapper"]}>
              <EditCanvas loading={loading} />
            </div>
          </div>
          <div className={styles.right}>
            <RightPanel />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Edit;
