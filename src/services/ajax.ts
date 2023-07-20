import { message } from "antd";
import axios from "axios";

// 创建实例
const instance = axios.create({
  timeout: 10 * 1000,
});

// 请求拦截

// 响应拦截
// 统一处理 errno 和 msg
instance.interceptors.response.use((res) => {
  const resData = (res.data || {}) as ResType;
  const { errno, data, msg } = resData;

  if (errno !== 0) {
    // 需要错误提示
    if (msg) {
      message.error(msg);
    }

    throw new Error(msg);
  }
  return data as any;
});

export default instance;

export type ResType = {
  errno: number;
  data?: ResDataType;
  msg?: string;
};

// 普通对象的要求
export type ResDataType = {
  [key: string]: any;
};
