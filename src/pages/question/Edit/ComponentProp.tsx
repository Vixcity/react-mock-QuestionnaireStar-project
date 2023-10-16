import React, { FC } from "react";
import useGetComponentInfo from "../../../hooks/useGetComponentInfo";
import { getComponentConfByType } from "../../../components/QuestionComponents";

const NoProp: FC = () => {
  return <div style={{ textAlign: "center" }}>未选中</div>;
};

const ComponentProp: FC = () => {
  const { selectedComponent } = useGetComponentInfo();
  if (!selectedComponent) return <NoProp />;

  const { type, props } = selectedComponent;
  const componentConf = getComponentConfByType(type);
  if (!componentConf) return <NoProp />;

  const { PropComponent } = componentConf;

  return <PropComponent {...props} />;
};

export default ComponentProp;
