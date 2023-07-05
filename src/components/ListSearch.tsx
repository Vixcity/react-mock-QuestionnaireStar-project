import React, { FC, useEffect, useState } from "react";
import type { ChangeEvent } from "react";
import { useNavigate, useLocation, useSearchParams } from "react-router-dom";
import { Input } from "antd";
import { LIST_SEARCH_PARAM_KEY } from "../constant";
const { Search } = Input;

const ListSearch: FC = () => {
  const [value, setValue] = useState("");
  const nav = useNavigate();
  const { pathname } = useLocation();
  // 获取URL 参数并返回到input value中
  const [searchParams] = useSearchParams();
  useEffect(() => {
    const curVal = searchParams.get(LIST_SEARCH_PARAM_KEY) || "";
    setValue(curVal);
  }, [searchParams]);

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    setValue(event.target.value);
  }

  function handleSearch(keyword: string) {
    nav({ pathname, search: `${LIST_SEARCH_PARAM_KEY}=${keyword}` });
    console.log(keyword);
  }
  return (
    <>
      <Search
        size="large"
        placeholder="输入关键字"
        allowClear={true}
        onSearch={handleSearch}
        onChange={handleChange}
        value={value}
        style={{ width: "200px" }}
      />
    </>
  );
};

export default ListSearch;
