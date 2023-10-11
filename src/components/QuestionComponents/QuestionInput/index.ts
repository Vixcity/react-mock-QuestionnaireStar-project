/**
 * @description 问卷 输入框
 * @author Vixcity
 */

import Component from "./Components";
import { QuestionInputDefaultProps } from "./interface";

export * from "./interface";

// Input 属性的配置
export default {
  title: "输入框",
  type: "questionInput", // 要和后端统一好
  Component,
  defaultProps: QuestionInputDefaultProps,
};
