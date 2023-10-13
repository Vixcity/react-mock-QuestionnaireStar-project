import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { ComponentPropsType } from "./../../components/QuestionComponents/index";

export type ComponentInfoType = {
  fe_id: string; // TODO 后面解释
  type: string;
  title: string;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  // 其他扩展
};

export const componentsSlice = createSlice({
  name: "components",
  initialState: INIT_STATE,
  reducers: {
    // 重置所有组件
    resetComponents: (
      state: ComponentsStateType,
      action: PayloadAction<ComponentsStateType>,
    ) => {
      return action.payload;
    },

    // 修改 selectedId
    changeSelectId: produce(
      (draft: ComponentsStateType, action: PayloadAction<string>) => {
        draft.selectedId = action.payload;
      },
    ),
  },
});

export const { resetComponents, changeSelectId } = componentsSlice.actions;

export default componentsSlice.reducer;
