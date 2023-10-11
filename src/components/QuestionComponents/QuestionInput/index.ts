/**
 * @description 问卷 输入框
 * @author Vixcity
 */

import Component from "./Components";
import { QuestionInputDefaultProps } from "./interface";

export * from "./interface";

export default {
  title: "输入框",
  type: "questionInput", // 要和后端统一好
  defaultProps: QuestionInputDefaultProps,
};
