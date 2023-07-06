import Mock from "mockjs";

Mock.mock("/api/test", "get", () => {
  return {
    errno: 0,
    data: {
      name: `小温问卷${Date.now()}`,
    },
  };
});
