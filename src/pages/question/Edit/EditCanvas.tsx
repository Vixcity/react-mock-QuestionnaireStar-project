import React, { FC } from "react";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import { ComponentInfoType } from "../../../store/componentReducer";
import styles from "./EditCanvas.module.scss";

// 临时展示一下title和input效果
// import QuestionTitle from "../../../components/QuestionComponents/QuestionTitle/Components";
// import QuestionInput from "../../../components/QuestionComponents/QuestionInput/Components";

type PropsType = {
  loading: boolean;
};

function genComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo; // 每个组件的信息，是从 redux store 中获取的

  const componentConf = getComponentConfByType(type);

  if (!componentConf) return;

  const { Component } = componentConf;
  return <Component {...props} />;
}

const EditCanvas: FC<PropsType> = ({ loading }) => {
  const { componentList } = useGetComponentInfo();
  getComponentConfByType;
  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      {componentList.map((c) => {
        const { fe_id } = c;

        return (
          <div key={fe_id} className={styles["component-wrapper"]}>
            <div className={styles.component}>{genComponent(c)}</div>
          </div>
        );
      })}
      {/* <div>
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
      </div> */}
    </div>
  );
};

export default EditCanvas;
