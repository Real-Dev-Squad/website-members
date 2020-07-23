import React from "react";
import classNames from "./index.scss";

const HomePage = () => {
  return (
    <div className={classNames.container}>
      <img className={classNames.img} src="/images/Real-Dev-Squad@1x.png" />
      <h1 className={classNames.heading}>Real Dev Squad Members</h1>
    </div>
  );
};

export default HomePage;
