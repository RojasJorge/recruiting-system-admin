import React from "react";

const PageTitle = ({ children, tag, className }) => (
  <div className="container">
    <div className="row">
      <div className="col">{React.createElement(tag, { className }, children)}</div>
    </div>
  </div>
);

export default PageTitle;
