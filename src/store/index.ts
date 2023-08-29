import { configureStore } from "@reduxjs/toolkit";
import useReducer, { UserStateType } from "./userReducer";

export type StateType = {
  user: UserStateType;
};

export default configureStore({
  reducer: {
    // 分模块
    user: useReducer,

    // 扩展问卷信息
  },
});
