export type OptionType = {
  value: string;
  text: string;
};

export type QuestionRadioPropsType = {
  title?: string;
  isVertical?: boolean;
  options?: Array<OptionType>;
  value?: string;
  onChange?: (newProps: QuestionRadioPropsType) => void;
  disabled?: boolean;
};

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: "单选标题",
  isVertical: false,
  options: [
    { text: "选项1", value: "item1" },
    { text: "选项2", value: "item2" },
    { text: "选项3", value: "item3" },
  ],
  value: "",
};
