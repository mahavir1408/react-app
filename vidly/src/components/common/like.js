import React, { Component } from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa fa-heart";
  if (!liked) classes += "-o";
  return (
    <i
      className={classes}
      onClick={onClick}
      aria-hidden="true"
      style={{ cursor: "pointer" }}
    ></i>
  );
};

export default Like;
