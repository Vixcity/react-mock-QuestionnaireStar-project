import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import { ComponentPropsType } from "./../../components/QuestionComponents/index";

export type ComponentInfoType = {
  fe_id: string; // 这个是在前端生成的 id 服务端 MongoDB 不认识这种格式，所以自定义一个 fe_id
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

    // 添加新组件
    addComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<ComponentInfoType>,
      ) => {
        const newComponent = action.payload;

        const { selectedId, componentList } = draft;
        const index = componentList.findIndex((c) => c.fe_id === selectedId);

        // 未选中组件
        if (index < 0) {
          draft.componentList.push(newComponent);
        } else {
          // 选中了组件，插入到index后面
          draft.componentList.splice(index + 1, 0, newComponent);
        }

        draft.selectedId = newComponent.fe_id;
      },
    ),
  },
});

export const { resetComponents, changeSelectId, addComponent } =
  componentsSlice.actions;

export default componentsSlice.reducer;
