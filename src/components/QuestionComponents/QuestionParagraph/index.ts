/**
 * @description 问卷 - 段落组件
 * @author Vixcity
 */

import Component from "./Component";
import PropComponent from "./PropComponent";
import { QuestionParagraphDefaultProps } from "./interface";

export * from "./interface";

// Paragraph 属性的配置
export default {
  title: "段落",
  type: "questionParagraph", // 要和后端统一好,
  Component,
  PropComponent,
  defaultProps: QuestionParagraphDefaultProps,
};
