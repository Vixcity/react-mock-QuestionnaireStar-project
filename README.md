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

- 首页
- 登录
- 注册
- 404
- 问卷管理
	- 我的问卷
	- 星标问卷
	- 回收站
- 问卷详情
	- 编辑
	- 问卷统计
