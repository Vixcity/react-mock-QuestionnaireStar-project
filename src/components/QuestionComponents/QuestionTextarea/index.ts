/**
 * @description 问卷 多行输入框
 * @author Vixcity
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionTextareaDefaultProps } from "./interface";

export * from "./interface";

// Textarea 属性的配置
export default {
  title: "多行输入",
  type: "questionTextarea", // 要和后端统一好
  Component, // 画布显示的组件
  PropComponent, // 修改属性
  defaultProps: QuestionTextareaDefaultProps,
};
