/**
 * @description 问卷 复选框
 * @author Vixcity
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionCheckboxDefaultProps } from "./interface";

export * from "./interface";

// Checkbox 属性的配置
export default {
  title: "复选框",
  type: "questionCheckbox", // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionCheckboxDefaultProps,
};
