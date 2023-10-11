import { configureStore } from "@reduxjs/toolkit";
import useReducer, { UserStateType } from "./userReducer";
import componentReducer,{ComponentsStateType} from "./componentReducer";

export type StateType = {
  user: UserStateType;
  components: ComponentsStateType
};

export default configureStore({
  reducer: {
    // 分模块
    user: useReducer,
    components: componentReducer,

    // 扩展问卷信息
  },
});
