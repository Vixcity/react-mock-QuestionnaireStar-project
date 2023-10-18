import { Tabs } from "antd";
import React, { FC } from "react";
import { FileTextOutlined, SettingOutlined } from "@ant-design/icons";
import ComponentProp from "./ComponentProp";

const RightPanel: FC = () => {
  const tabItems = [
    {
      key: "prop",
      label: (
        <span>
          <FileTextOutlined />
          属性
        </span>
      ),
      children: <ComponentProp />,
    },
    {
      key: "setting",
      label: (
        <span>
          <SettingOutlined />
          页面设置
        </span>
      ),
      children: <div>页面设置</div>,
    },
  ];
  return (
    <div style={{ height: "calc(100vh - 81px)" }}>
      <Tabs defaultActiveKey="prop" items={tabItems}></Tabs>
    </div>
  );
};

export default RightPanel;
