import React, { FC } from "react";
import { Outlet } from "react-router-dom";
import { Spin } from "antd";
import useLoadUserData from "../hooks/useLoadUserData";

const QuestionLayout: FC = () => {
  const { waitingUserData } = useLoadUserData();

  return (
    <>
      <p>QuestionLayout header</p>
      <div>
        {waitingUserData ? (
          <div style={{ textAlign: "center", marginTop: "60px" }}>
            <Spin />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </>
  );
};

export default QuestionLayout;
