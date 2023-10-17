import React, { FC } from "react";
import { Spin } from "antd";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";
import classNames from "classnames";
import {
  ComponentInfoType,
  changeSelectId,
} from "../../../store/componentReducer";
import styles from "./EditCanvas.module.scss";
import { useDispatch } from "react-redux";
import useBindCanvasKeyPress from "../../../hooks/useBindCanvasKeyPress";

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
  const { componentList, selectedId } = useGetComponentInfo();
  const dispatch = useDispatch();

  function handleClick(event: React.MouseEvent, id: string) {
    event.stopPropagation(); // 阻止冒泡
    dispatch(changeSelectId(id));
  }

  // 绑定快捷键
  useBindCanvasKeyPress();

  if (loading) {
    return (
      <div style={{ textAlign: "center" }}>
        <Spin />
      </div>
    );
  }

  return (
    <div className={styles.canvas}>
      {componentList
        .filter((c) => !c.isHidden)
        .map((c) => {
          const { fe_id, isLocked } = c;

          // 拼接 class name
          const wrapperDefaultClassName = styles["component-wrapper"];
          const selectedClassName = styles.selected;
          const lockedClassName = styles.locked;
          const wrapperClassName = classNames({
            [wrapperDefaultClassName]: true,
            [selectedClassName]: fe_id === selectedId,
            [lockedClassName]: isLocked,
          });

          return (
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={(e) => handleClick(e, fe_id)}
            >
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
