/**
 * @description 问卷 标题框
 * @author Vixcity
 */

import Component from "./Components";
import { QuestionTitleDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionTitle", // 要和后端统一好,
  Component,
  defaultProps: QuestionTitleDefaultProps,
};
