/**
 * @description 问卷 - info 组件
 * @author Vixcity
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionInfoDefaultProps } from "./interface";

export * from "./interface";

// Info 属性的配置
export default {
  title: "段落",
  type: "questionInfo", // 要和后端统一好,
  Component,
  PropComponent,
  defaultProps: QuestionInfoDefaultProps,
};
