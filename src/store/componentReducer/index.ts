import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import produce from "immer";
import cloneDeep from "lodash.clonedeep";
import { nanoid } from "nanoid";
import { ComponentPropsType } from "./../../components/QuestionComponents/index";
import { getNextSelectId, insertNewComponent } from "./utils";

export type ComponentInfoType = {
  fe_id: string; // 这个是在前端生成的 id 服务端 MongoDB 不认识这种格式，所以自定义一个 fe_id
  type: string;
  title: string;
  isHidden?: boolean;
  isLocked?: boolean;
  props: ComponentPropsType;
};

export type ComponentsStateType = {
  selectedId: string;
  componentList: Array<ComponentInfoType>;
  copiedComponent: ComponentInfoType | null;
};

const INIT_STATE: ComponentsStateType = {
  selectedId: "",
  componentList: [],
  // 其他扩展
  copiedComponent: null,
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
        insertNewComponent(draft, newComponent);
      },
    ),

    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: ComponentPropsType }>,
      ) => {
        const { fe_id, newProps } = action.payload;

        // 当前要修改属性的组件
        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.props = {
            ...curComp.props,
            ...newProps,
          };
        }
      },
    ),

    // 删除选中的组件
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      const { componentList = [], selectedId: removedId } = draft;

      // 重新计算 selectedId
      const newSelectedId = getNextSelectId(removedId, componentList);
      draft.selectedId = newSelectedId;

      const index = componentList.findIndex((c) => c.fe_id === removedId);
      componentList.splice(index, 1);
    }),

    // 隐藏/显示组件
    changeComponentHidden: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; isHidden: boolean }>,
      ) => {
        const { componentList } = draft;
        const { fe_id, isHidden } = action.payload;

        // 重新计算 selectedId
        let newSelectedId = "";
        if (isHidden) {
          // 要隐藏
          newSelectedId = getNextSelectId(fe_id, componentList);
        } else {
          // 要显示
          newSelectedId = fe_id;
        }
        draft.selectedId = newSelectedId;

        const curComp = componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isHidden = isHidden;
        }
      },
    ),

    // 锁定/解锁组件
    toggleComponentLocked: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string }>,
      ) => {
        const { fe_id } = action.payload;

        const curComp = draft.componentList.find((c) => c.fe_id === fe_id);
        if (curComp) {
          curComp.isLocked = !curComp.isLocked;
        }
      },
    ),

    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      const { selectedId, componentList = [] } = draft;

      const selectedComponent = componentList.find(
        (c) => c.fe_id === selectedId,
      );
      if (!selectedComponent) return;

      draft.copiedComponent = cloneDeep(selectedComponent); // 深拷贝
    }),

    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copiedComponent } = draft;
      if (!copiedComponent) return;

      // 要把 fe_id 修改了，重要
      copiedComponent.fe_id = nanoid();

      // 插入 copiedComponent
      insertNewComponent(draft, copiedComponent);
    }),
  },
});

export const {
  resetComponents,
  changeSelectId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
} = componentsSlice.actions;

export default componentsSlice.reducer;
