# react-mock-QuestionnaireStar-project

## 运行

```bash
yarn dev
```

## 打包

```bash
yarn build
```

## 添加 eslint

[点击查看](https://www.cnblogs.com/yambo92/p/13740064.html)

在根目录添加 .eslintrc.js 文件

```js
module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [".eslintrc.{js,cjs}"],
      parserOptions: {
        sourceType: "script",
      },
    },
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["@typescript-eslint", "react"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "linebreak-style": ["error", "windows"],
    quotes: ["error", "double"],
    semi: ["error", "always"],
  },
};
```

## 简单介绍

```js
// src/components 目录 - 组件
// src/pages 目录 - 页面（react - 组件）

// 业务 - 页面（跳转，切换，大面积的），组件（零件）
```

## 路由

```bash
yarn add react-router-dom --save
```

### 使用方法

#### 页面内部

```tsx
import React, { FC } from "react";
import { Outlet } from "react-router-dom";

const QuestionLayout: FC = () => {
  return (
    <>
      <p>QuestionLayout header</p> 
      <div>
        <Outlet />
      </div>
    </>
  );
};

export default QuestionLayout;
```

#### router.tsx

```tsx
import React from "react";
import { createBrowserRouter } from "react-router-dom";

import MainLayout from "../layouts/MainLayout";
import ManageLayout from "../layouts/ManageLayout";
import QuestionLayout from "../layouts/QuestionLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import NotFound from "../pages/NotFound";
import List from "../pages/manage/List";
import Trash from "../pages/manage/Trash";
import Star from "../pages/manage/Star";
import Edit from "../pages/question/Edit";
import Stat from "../pages/question/Stat";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "*", // 404 路由，一般写在最后，进行兜底
        element: <NotFound />,
      },
    ],
  },
  {
    path: "question",
    element: <QuestionLayout />,
    children: [
      {
        path: "edit/:id",
        element: <Edit />,
      },
      {
        path: "stat/:id",
        element: <Stat />,
      },
    ],
  },
  {
    path: "manage",
    element: <ManageLayout />,
    children: [
      {
        path: "list",
        element: <List />,
      },
      {
        path: "star",
        element: <Star />,
      },
      {
        path: "trash",
        element: <Trash />,
      },
    ],
  },
]);

export default router;
```

- 首页 `/`
- 登录 `/login`
- 注册 `/register`
- 404
- 问卷管理
    - 我的问卷 `/manage/list`
    - 星标问卷 `/manage/star`
    - 回收站 `/manage/trash`
- 问卷详情
    - 编辑 `/question/edit:id` （动态路由）Restful API
    - 问卷统计 `/question/stat:id`
