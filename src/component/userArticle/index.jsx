import React from "react";

import UserArticleList from "../../container/userArticle";

import "./userArticle.css";

function UserArticle(props) {
  return (
    <div className="djm-index-content">
      <ul className="djm-index-uesr-article clearfloat">
        <UserArticleList {...props} />
        <span className="separated-line" />
      </ul>
    </div>
  );
}
export default UserArticle;
