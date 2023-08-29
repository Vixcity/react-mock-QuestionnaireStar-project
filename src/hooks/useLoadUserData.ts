import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useRequest } from "ahooks";
import useGetUserInfo from "./useGetUserInfo";
import { getUserInfoServices } from "../services/user";
import { loginReducer } from "../store/userReducer";

function useLoadUserData() {
  const dispatch = useDispatch();
  const [waitingUserData, setWaitingUserData] = useState(true);

  // ajax 加载用户信息
  const { run } = useRequest(getUserInfoServices, {
    manual: true,
    onSuccess(result) {
      const { username, nickname } = result;
      // 存储到 redux store
      dispatch(loginReducer({ username, nickname }));
    },
    onFinally() {
      setWaitingUserData(false);
    },
  });

  // 加载完用户信息之后，放在 redux 当中，不用返回
  const { username } = useGetUserInfo(); // 如果已经存储到 redux 当中，就不需要在去进行请求了

  useEffect(() => {
    // 判断当前 redux store 是否已经存在用户信息
    if (username) {
      setWaitingUserData(false); // 如果 redux 已经存在用户信息，就不需要重新加载了
      return;
    }
    
    run(); // 如果 redux 中没有用户信息，则进行加载
  }, [username]);

  return { waitingUserData };
}

export default useLoadUserData;
