import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type UserStateType = {
  nickname: string;
  username: string;
};

const INIT_STATE: UserStateType = {
  username: "",
  nickname: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState: INIT_STATE,
  reducers: {
    loginReducer: (
      state: UserStateType,
      action: PayloadAction<UserStateType>,
    ) => {
      return action.payload; // 设置 username , nickname 到 redux store 中
      // 用不到 immer
    },
    logoutReducer: () => INIT_STATE,
  },
});

export const { loginReducer, logoutReducer } = userSlice.actions;
export default userSlice.reducer;
